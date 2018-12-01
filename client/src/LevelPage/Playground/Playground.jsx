import React, {Component} from 'react'
import Tree from './Tree'
import {Col} from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {initialState} from "./initialState";
import InstructionDraggableOnly from "./InstructionDraggableOnly";
import {instructions} from "./Instructions/instructions";
import {generateGuid} from "../../_helpers/utils";

class Playground extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    moveItem(id, afterId, nodeId) {
        if (id === afterId) return;

        let {tree} = this.state;

        const removeNode = (id, items) => {
            for (const node of items) {
                if (node.id === id) {
                    items.splice(items.indexOf(node), 1);
                    return;
                }

                if (node.children && node.children.length) {
                    removeNode(id, node.children);
                }
            }
        };

        const item = {...this.findItem(id, tree)};
        if (!item.id) {
            console.log(`item with id ${id} not found in tree`);
            const {lastIdAdded} = this.state;
            if (id !== lastIdAdded) {
                const item = {
                    id: generateGuid(),
                    type: instructions.IfBlock,
                    droppable: false,
                    attributes: {title: 'Variable'},
                    children: []
                };
                tree.push(item);
                this.setState({
                    ...this.state,
                    lastIdAdded: id,
                    tree
                });
            }
            return;
        }

        const dest = nodeId ? this.findItem(nodeId, tree).children : tree;

        if (!afterId) {
            removeNode(id, tree);
            dest.push(item);
        } else {
            const index = dest.indexOf(dest.filter(v => v.id === afterId).shift());
            removeNode(id, tree);
            dest.splice(index, 0, item);
        }

        this.setState({
            ...this.state,
            tree
        });
    }

    findItem(id, items) {
        for (const node of items) {
            if (node.id === id) return node;
            if (node.children && node.children.length) {
                const result = this.findItem(id, node.children);
                if (result) {
                    return result
                }
            }
        }

        return false
    }

    finishDrop() {
        this.setState({
            ...this.state,
            lastIdAdded: undefined
        })
    }

    render() {
        const {tree} = this.state;

        return (
            <Col sm={7} md={7} className="playground">
                <div className="playground-code">
                    <Tree
                        parent={null}
                        items={tree}
                        move={this.moveItem.bind(this)}
                        find={this.findItem.bind(this)}
                        finishDrop={this.finishDrop.bind(this)}
                    />
                </div>
                <div className="playground-instructions">
                    <InstructionDraggableOnly
                        id={100}
                        parent={null}
                        item={{id: 100, attributes: {title: 'Variable'}, children: []}}
                    />
                </div>
            </Col>
        )
    }
}

export default DragDropContext(HTML5Backend)(Playground)
