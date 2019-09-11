import React, { } from 'react';
import Tree from 'react-d3-tree';
import { IKinshipNames } from '../shared/IKinshipNames';
import { any } from 'prop-types';
import { IPerson } from '../../interfaces/IPerson';

type typeData = {
    listKinshipNames: Array<IKinshipNames>,
    person: IPerson
}

const familyTree: React.FC<typeData> = (props) => {
    const listRelation: Array<IKinshipNames> = props.listKinshipNames;
    const greenNode = { shape: 'rect', shapeProps: { width: 20, height: 20, fill: 'green', x: -10, y: -10 } };
    const redNode = { shape: 'circle', shapeProps: { r: 15, x: -10, y: -10, fill: 'red' } };
    const blueNode = { shape: 'rect', shapeProps: { width: 20, height: 20, x: -10, y: -10, fill: 'blue' } };
    const greyNode = { shape: 'circle', shapeProps: { r: 15, x: -10, y: -10, fill: 'grey' } };
    const purpleNode = { shape: 'rect', shapeProps: { width: 20, height: 20, x: -10, y: -10, fill: 'purple' } };


    function myTreeData() {
        return (

            {
                name: props.person ? (`${props.person.name} ${props.person.last_name}`) : "No hay persona",
                nodeSvgShape: greenNode,
                children: [
                    { name: 'Spouse', nodeSvgShape: redNode, children: [{ name: 'NAN', nodeSvgShape: blueNode }] },
                    { name: 'Siblings', nodeSvgShape: redNode, children: [{ name: 'NAN', nodeSvgShape: blueNode }] },
                    {
                        name: 'Parents', nodeSvgShape: redNode, children: [
                            {
                                name: 'Mother',
                                nodeSvgShape: blueNode,
                                children: [{ name: 'grandparents', nodeSvgShape: greyNode, children: [{ name: 'GrandFather', nodeSvgShape: purpleNode }, { name: 'GrandMother', nodeSvgShape: purpleNode }] }]
                            },
                            {
                                name: 'Father',
                                nodeSvgShape: blueNode,
                                children: [{ name: 'grandparents', nodeSvgShape: greyNode, children: [{ name: 'GrandFather', nodeSvgShape: purpleNode }, { name: 'GrandMother', nodeSvgShape: purpleNode }] }]
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
                if(rootBrother[0] && rootBrother[0].name === "NAN"){
                    rootBrother.shift();
                }
                rootBrother.push({
                    name: kinshipName.personOne === personFullName ? kinshipName.personTwo: kinshipName.personOne,
                    id: kinshipName.id,
                    nodeSvgShape: blueNode,
                })
            }

            if(kinshipName.relation === "Father"){
                let targetParent: any = dataTree.children[relationId["Parents"]].children;
                if(targetParent[0] && targetParent[0].name === "NAN"){
                    targetParent.shift();
                }
                targetParent.name = kinshipName.personOne === personFullName ? kinshipName.personTwo: kinshipName.personOne;
            }


        });
      return dataTree;
    }

    return (
        <Tree data={loadPersonRelations()} />
    );

}
export default familyTree;