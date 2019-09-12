import React, { } from 'react';
import Tree from 'react-d3-tree';
import { IPerson } from '../../interfaces/IPerson';
import { IKinshipsWithParents } from '../../interfaces/IkinshipsWithParents';

type typeData = {
    listKinshipNames: Array<IKinshipsWithParents>,
    person: IPerson
}

const familyTree: React.FC<typeData> = (props) => {
    const greenNode = { shape: 'rect', shapeProps: { width: 20, height: 20, fill: 'green', x: -10, y: -10 } };
    const redNode = { shape: 'circle', shapeProps: { r: 15, x: -10, y: -10, fill: 'red' } };
    const blueNode = { shape: 'rect', shapeProps: { width: 20, height: 20, x: -10, y: -10, fill: 'blue' } };
    const purpleNode = { shape: 'rect', shapeProps: { width: 20, height: 20, x: -10, y: -10, fill: 'purple' } };


    function myTreeData() {
        return (

            {
                name: props.person ? (`${props.person.name} ${props.person.last_name}`) : "Not found person",
                nodeSvgShape: greenNode,
                children: [
                    { name: '- Spouse', nodeSvgShape: redNode, children: [{ name: 'Unknown', nodeSvgShape: blueNode }] ,_collapsed: true},
                    { name: '- Siblings', nodeSvgShape: redNode, children: [{ name: 'Unknown', nodeSvgShape: blueNode }] ,_collapsed: true},
                    {
                        name: '- Parents', nodeSvgShape: redNode, _collapsed: true,
                        attributes: {
                            "- Mother": '',
                            "- Father": '', 
                        
                        },
                        children: [
                            {
                                name: 'Unknown',
                                nodeSvgShape: blueNode,
                                children: [{ name: '- grandparents', nodeSvgShape: redNode, children: [{ name: 'Unknown', nodeSvgShape: purpleNode }, { name: 'Unknown', nodeSvgShape: purpleNode }] }]
                            },
                            {
                                name: 'Unknown',
                                nodeSvgShape: blueNode,
                                children: [{ name: '- grandparents', nodeSvgShape: redNode, children: [{ name: 'Unknown', nodeSvgShape: purpleNode }, { name: 'Unknown', nodeSvgShape: purpleNode }] }]
                            }
                        ],
                    },
                    { name: '- GrandParents', nodeSvgShape: redNode, children: [] ,_collapsed: true},
                ]
            }
        );
    }

    var injectedNodesCount = 0;


    const relationId: any = { "Spouse": 0, "Parents": 2, "Siblings": 1, "GrandParents": 5 };

    function loadPersonRelations() {
        const dataTree: any = myTreeData();
        const personFullName = props.person ? `${props.person.name} ${props.person.last_name}`: "Not found person";

        props.listKinshipNames.forEach(kinshipName => {
            
            if(kinshipName.relation === "Spouse"){
                let targetSpouse: any = dataTree.children[relationId["Spouse"]].children[0];
                targetSpouse.name = kinshipName.personOne === personFullName ? kinshipName.personTwo: kinshipName.personOne;
            }

            if(kinshipName.relation === "Brother" || kinshipName.relation === "Sister" ){
                let rootBrother: Array<any> =  dataTree.children[relationId["Siblings"]].children
                if(rootBrother[0] && rootBrother[0].name === "Unknown"){
                    rootBrother.shift();
                }
                rootBrother.push({
                    name: kinshipName.personOne === personFullName ? kinshipName.personTwo: kinshipName.personOne,
                    id: kinshipName.id,
                    nodeSvgShape: blueNode,


                    
                })
            }

            if(kinshipName.relation === "Father" || kinshipName.relation === "Mother"){
                let targetParent: any = dataTree.children[relationId["Parents"]].children;

                if(kinshipName.relation === "Mother" && targetParent[0] && targetParent[0].name === "Unknown"){
                    let mother = targetParent[0];
                    mother.key = "Mother";
                    mother.name = kinshipName.personOne === personFullName ? `Unknown`: `${kinshipName.personOne}`;

                    let grandParents = mother.children.length > 0 ? mother.children[0]: undefined;
                    grandParents.attributes = {
                        "- GrandFather": '',
                        "- GrandMother": '', 
                    
                    }
                    if(grandParents){
                        const grandFatherFromKinship: IPerson | undefined = kinshipName.grandParentsMother ? kinshipName.grandParentsMother[0]: undefined;
                        const grandMotherFromKinship: IPerson | undefined = kinshipName.grandParentsMother ? kinshipName.grandParentsMother[1]: undefined;

                        const grandFatherFullName = grandFatherFromKinship ? `${grandFatherFromKinship.name} ${grandFatherFromKinship.last_name}`: "Unknown";
                        const grandMotherFullName = grandMotherFromKinship ?  `${grandMotherFromKinship.name} ${grandMotherFromKinship.last_name}`: "Unknown";
                         
                        grandParents.children[0].name =  grandFatherFullName;
                        grandParents.children[1].name = grandMotherFullName;
                    }
                }

                if(kinshipName.relation === "Father" && targetParent[1] && targetParent[1].name === "Unknown"){

                    let father = targetParent[1];
                    father.key = "Father";
                    father.name = kinshipName.personOne === personFullName ? `Unknown`: `${kinshipName.personOne}`;

                    let grandParents = father.children.length > 0 ? father.children[0]: undefined;
                    grandParents.attributes = {
                        "- GrandFather": '',
                        "- GrandMother": '', 
                    
                    }
                    if(grandParents){
                        const grandFatherFromKinship: IPerson | undefined = kinshipName.grandParentsFather ? kinshipName.grandParentsFather[0]: undefined;
                        const grandMotherFromKinship: IPerson | undefined = kinshipName.grandParentsFather ? kinshipName.grandParentsFather[1]: undefined;

                        const grandFatherFullName = grandFatherFromKinship ? `${grandFatherFromKinship.name} ${grandFatherFromKinship.last_name}`: "Unknown";
                        const grandMotherFullName = grandMotherFromKinship ?  `${grandMotherFromKinship.name} ${grandMotherFromKinship.last_name}`: "Unknown";
                         
                        grandParents.children[0].name =  grandFatherFullName;
                        grandParents.children[1].name = grandMotherFullName;
                    }
                }


            }

            if((kinshipName.relation === "Grandfather" || kinshipName.relation === "Grandmother") && kinshipName.personOne !== personFullName) {
                let targetParent: any = dataTree.children[3].children;
                targetParent.push({
                    name: kinshipName.personOne === personFullName ? `Unknown`: `${kinshipName.personOne}`,
                    nodeSvgShape: purpleNode
                 })
            }
        });
      return dataTree;
    }
    const translate = {x: 200 / 2, y: 500 / 2};
    return (
        <Tree data={loadPersonRelations()}
            translate= {translate}
        />
    );

}
export default familyTree;