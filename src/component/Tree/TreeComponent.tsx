import React, { Children } from 'react';
import Tree from "react-d3-tree";
import clone from "clone";

const myTreeData = {

    name: 'Person\n Maggie',

    nodeSvgShape: {
        shape: 'rect',
        shapeProps: {
            width: 20,
            height: 20,
            fill: 'green',
            x: -10,
            y: -10
        },
    },
    children: [
        {
            name: 'spouse',
            nodeSvgShape: {
                shape: 'circle',
                shapeProps: {
                    r: 20,
                    x: -10,
                    y: -10,
                    fill: 'red',
                },
            },
            children: [{
                name: 'no tiene',
                nodeSvgShape: {
                    shape: 'rect',
                    shapeProps: {
                        width: 20,
                        height: 20,
                        x: -10,
                        y: -10,
                        fill: 'blue',
                    }
                },
            }]
        },
        {
            name: 'hermanos',
            nodeSvgShape: {
                shape: 'circle',
                shapeProps: {
                    r: 20,
                    x: -10,
                    y: -10,
                    fill: 'red',
                },
            },

            children: [
                {
                    name: 'bart',

                    nodeSvgShape: {
                        shape: 'rect',
                        shapeProps: {
                            width: 20,
                            height: 20,
                            x: -10,
                            y: -10,
                            fill: 'blue',
                        }
                    }
                },
                {
                    name: 'lisa',
                    nodeSvgShape: {
                        shape: 'rect',
                        shapeProps: {
                            width: 20,
                            height: 20,
                            x: -10,
                            y: -10,
                            fill: 'blue',
                        }
                    }
                }
            ],


        },
        {
            name: 'padres',
            nodeSvgShape: {
                shape: 'circle',
                shapeProps: {
                    r: 20,
                    x: -10,
                    y: -10,
                    fill: 'red',
                },
            },

            children: [
                {
                    name: 'Margge',
                    attributes: {

                    },
                    nodeSvgShape: {
                        shape: 'rect',
                        shapeProps: {
                            width: 20,
                            height: 20,
                            x: -10,
                            y: -10,
                            fill: 'blue',
                        }
                    },
                    children: [
                        {
                            name: 'abuelos',
                            nodeSvgShape: {
                                shape: 'circle',
                                shapeProps: {
                                    r: 20,
                                    x: -10,
                                    y: -10,
                                    fill: 'grey',
                                },
                            },
                            children: [
                                {
                                    name: 'Clancy',
                                    nodeSvgShape: {
                                        shape: 'rect',
                                        shapeProps: {
                                            width: 20,
                                            height: 20,
                                            x: -10,
                                            y: -10,
                                            fill: 'purple',
                                        },
                                    },

                                },
                                {
                                    name: 'Jackeline',
                                    nodeSvgShape: {
                                        shape: 'rect',
                                        shapeProps: {
                                            width: 20,
                                            height: 20,
                                            x: -10,
                                            y: -10,
                                            fill: 'purple',
                                        },
                                    },

                                },

                            ],

                        },
                    ],

                },
                {
                    name: 'Homer',
                    attributes: {

                    },
                    nodeSvgShape: {
                        shape: 'rect',
                        shapeProps: {
                            width: 20,
                            height: 20,
                            x: -10,
                            y: -10,
                            fill: 'blue',
                        }
                    },
                    children: [
                        {
                            name: 'abuelos',
                            nodeSvgShape: {
                                shape: 'circle',
                                shapeProps: {
                                    r: 20,
                                    x: -10,
                                    y: -10,
                                    fill: 'grey',
                                },
                            },
                            children: [
                                {
                                    name: 'Mona',
                                    nodeSvgShape: {
                                        shape: 'rect',
                                        shapeProps: {
                                            width: 20,
                                            height: 20,
                                            x: -10,
                                            y: -10,
                                            fill: 'purple',
                                        },
                                    },

                                },
                                {
                                    name: 'Abraham',
                                    nodeSvgShape: {
                                        shape: 'rect',
                                        shapeProps: {
                                            width: 20,
                                            height: 20,
                                            x: -10,
                                            y: -10,
                                            fill: 'purple',
                                        },
                                    },

                                },

                            ],

                        },
                    ],
                },

            ],


        },



    ],

};

const containerStyles = {
    width: "100%",
    height: "100vh"
};

export default class CenteredTree extends React.PureComponent {
    state = {
        data: myTreeData
    };

    injectedNodesCount = 0;

    addChildNode = () => {
        const nextData = clone(this.state.data);
        const target = nextData.children[1].children;
        this.injectedNodesCount++;
        target.push({
            name: `Inserted Node ${this.injectedNodesCount}`,
            id: `inserted-node-${this.injectedNodesCount}`
        });
        this.setState({
            data: nextData
        });
    };

    removeChildNode = () => {
        const nextData = clone(this.state.data);
        const target = nextData.children;
        target.pop();
        this.injectedNodesCount--;
        this.setState({
            data: nextData
        });
    };

    componentDidMount() {
        // Get treeContainer's dimensions so we can center the tree
        const dimensions = treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 10,
                y: dimensions.height / 10
            }
        });
    }

    render() {
        return (
            <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
                <button onClick={this.addChildNode}>Add Node</button>
                <button onClick={this.removeChildNode}>Remove Node</button>
                <Tree
                    data={this.state.data}
                    translate={this.state.translate}
                    orientation={"vertical"}
                />
            </div>
        );
    }
}