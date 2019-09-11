import React, { } from 'react';
import Tree from 'react-d3-tree';
import { IKinshipNames } from '../shared/IKinshipNames';
import { IPerson } from '../../interfaces/IPerson';

type typeData = {
    listKinshipNames: Array<IKinshipNames>,
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
                name: props.person ? (`${props.person.name} ${props.person.last_name}`) : "No hay persona",
                nodeSvgShape: greenNode,
                children: [
                    { name: '- Spouse', nodeSvgShape: redNode, children: [{ name: 'Unknow', nodeSvgShape: blueNode }] ,_collapsed: true},
                    { name: '- Siblings', nodeSvgShape: redNode, children: [{ name: 'Unknow', nodeSvgShape: blueNode }] ,_collapsed: true},
                    {
                        name: '- Parents', nodeSvgShape: redNode, _collapsed: true,
                        attributes: {
                            "- Mother": '',
                            "- Father": '', 
                        
                        },
                        children: [
                            {
                                name: 'Unknow',
                                nodeSvgShape: blueNode,
                                children: [{ name: '- grandparents', nodeSvgShape: redNode, children: [{ name: 'GrandFather', nodeSvgShape: purpleNode }, { name: 'GrandMother', nodeSvgShape: purpleNode }] }]
                            },
                            {
                                name: 'Unknow',
                                nodeSvgShape: blueNode,
                                children: [{ name: '- grandparents', nodeSvgShape: redNode, children: [{ name: 'GrandFather', nodeSvgShape: purpleNode }, { name: 'GrandMother', nodeSvgShape: purpleNode }] }]
                            }
                        ],
                    }
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
                if(rootBrother[0] && rootBrother[0].name === "Unknow"){
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
                if(kinshipName.relation === "Mother" && targetParent[0] && targetParent[0].name === "Unknow"){
                    targetParent[0].name = kinshipName.personOne === personFullName ? `Mother: ${kinshipName.personTwo}`: `Mother: ${kinshipName.personOne}`;
                }
                if(kinshipName.relation === "Father" && targetParent[1] && targetParent[1].name === "Unknow"){
                    targetParent[1].key = "Father";
                    targetParent[1].name = kinshipName.personOne === personFullName ? `${kinshipName.personTwo}`: `${kinshipName.personOne}`;
                }
            }
            if(kinshipName.relation === "GrandFather" || kinshipName.relation === "GrandMother"){
                console.log("chupelo");
                
            }

        });
      return dataTree;
    }
    const translate = {x: 200 / 2, y: 700 / 2};
    return (
        <Tree data={loadPersonRelations()}
            translate= {translate}
        />
    );

}
export default familyTree;