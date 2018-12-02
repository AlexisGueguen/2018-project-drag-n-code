import React from 'react'
import Tree from './Tree'
import {Col} from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {initialState} from "./initialState";
import InstructionDraggableOnly from "./InstructionDraggableOnly";
import DroppableRemoveInstruction from "./DroppableRemoveInstruction";
import {VariableDeclaration} from "./Instructions";

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    removeItem = id => {
        const {tree} = this.state;
        this.removeNode(id, tree);
        this.setState({
            ...this.state,
            tree
        })
    };

    moveItem(id, afterId, nodeId) {
        if (id === afterId) return;

        let {tree} = this.state;

        const item = {...this.findItem(id, tree)};
        const dest = nodeId ? this.findItem(nodeId, tree).children : tree;

        if (!item.id) {
            const {lastIdAdded} = this.state;
            if (id !== lastIdAdded) {
                const item = VariableDeclaration.createInstruction();
                dest.push(item);
                this.setState({
                    ...this.state,
                    lastIdAdded: id,
                    tree
                });
            }
            return;
        }

        if (!afterId) {
            this.removeNode(id, tree);
            dest.push(item);
        } else {
            const index = dest.indexOf(dest.filter(v => v.id === afterId).shift());
            this.removeNode(id, tree);
            dest.splice(index, 0, item);
        }

        this.setState({
            ...this.state,
            tree
        });
    }

    updateItem(itemUpdated) {
        let {tree} = this.state;
        this.findAndUpdateNode(itemUpdated, tree);
        this.setState({
            ...this.state,
            tree: tree
        });
    }

    findAndUpdateNode(newItem, items) {
        let {id} = newItem;
        for (let node of items) {
            if (node.id === id) {
                node.attributes = newItem.attributes;
                return node;
            }
            if (node.children && node.children.length) {
                const result = this.findItem(id, node.children);
                if (result) {
                    return result
                }
            }
        }
    }

    removeNode = (id, items) => {
        for (const node of items) {
            if (node.id === id) {
                items.splice(items.indexOf(node), 1);
                return;
            }

            if (node.children && node.children.length) {
                this.removeNode(id, node.children);
            }
        }
    };

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
                        update={this.updateItem.bind(this)}
                        finishDrop={this.finishDrop.bind(this)}
                    />
                </div>
                <DroppableRemoveInstruction remove={this.removeItem.bind(this)}/>
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
