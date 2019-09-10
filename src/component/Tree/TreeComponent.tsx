import React, {} from 'react';
import Tree from 'react-d3-tree';
import { IKinshipNames } from '../shared/IKinshipNames';

type typeData = {
    data: Array<IKinshipNames>
}

const familyTree: React.FC <typeData>= (props) => {
    const listRelation: Array<IKinshipNames> = props.data;
    const greenNode =  {shape: 'rect',shapeProps: {width: 20, height: 20, fill: 'green', x: -10, y: -10}}; 
    const redNode = { shape: 'circle', shapeProps: { r:15, x: -10, y: -10, fill: 'red'}};
    const blueNode = { shape: 'rect', shapeProps: { width: 20, height: 20, x: -10, y: -10, fill: 'blue'}};
    const greyNode = {shape: 'circle',shapeProps: {r: 15, x: -10, y: -10, fill: 'grey'}};
    const purpleNode ={shape: 'rect', shapeProps:  { width: 20, height: 20, x: -10, y: -10, fill: 'purple'}};

    

    function myTreeData (){
        return (
            
            {
                name: 'Person',
                nodeSvgShape: greenNode,
                children: [            
                    {name: 'Spouse',nodeSvgShape:redNode,children:[{name:'NAN',nodeSvgShape: blueNode}]},
                    {name: 'Brothers/Sisters',nodeSvgShape: redNode,children: [{name:'NAN',nodeSvgShape: blueNode}]},
                    {name: 'Parents',nodeSvgShape: redNode,children: [
                            {
                                name: 'Mother',
                                nodeSvgShape: blueNode,
                                children: [{name: 'grandparents',nodeSvgShape: greyNode,children: [{name: 'GrandFather',nodeSvgShape: purpleNode},{name: 'GrandMother',nodeSvgShape: purpleNode}]}]
                            },
                            {
                                name: 'Father',
                                nodeSvgShape: blueNode,
                                children: [{name: 'grandparents',nodeSvgShape: greyNode,children: [{name: 'GrandFather',nodeSvgShape: purpleNode},{name: 'GrandMother',nodeSvgShape: purpleNode}]}]
                            }
                        ],
                    }
                ]
            }
        );
    }
    
    listRelation.forEach(person => {
        console.log(person)
    });
    var injectedNodesCount = 0;
    

    const relationId:any = {"Spose":0, "father":2, "mother":2, "brother":1, "sister":1, "GrandMother":5, "GrandFather":5 };

    function loadPersonRelations (relation:string) {
        
        const nextData:any = myTreeData();
        const target = nextData.children[0].children;
        injectedNodesCount++;
        target.push({
            name: `Inserted Node ${injectedNodesCount}`,
            id: `inserted-node-${injectedNodesCount}`
        });
        return nextData;
    }
    
    return (
        <Tree data={loadPersonRelations("brother")} />
    );
    
}
export default familyTree;