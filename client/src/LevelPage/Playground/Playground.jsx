import React from 'react'
import Tree from './Tree'
import {Col} from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {initialState} from "./initialState";
import InstructionDraggableOnly from "./InstructionDraggableOnly";
import DroppableRemoveInstruction from "./DroppableRemoveInstruction";
import {connect} from "react-redux";
import {codeTreeActions} from "../../_actions";
import {createInstructionFromType} from "./Instructions/utils";
import {instructions} from "./Instructions/instructions";
import EmptyTreeTarget from "./EmptyTreeTarget";
import _ from 'lodash';

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(codeTreeActions.init());
        this.state = {
            tree: _.clone(initialState.tree)
        };
    }

    removeItem = id => {
        const {tree} = this.state;
        this.removeNode(id, tree);
        this.updateTreeState(tree);
    };

    moveItem(id, afterId, nodeId) {
        if (id === afterId) return;

        let {tree} = this.state;

        const item = {...this.findItem(id, tree)};
        const dest = nodeId ? this.findItem(nodeId, tree).children : tree;

        if (!item.id) {
            this.addItem(id, dest);
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

        this.updateTreeState(tree);
    }

    updateItem(itemUpdated) {
        let {tree} = this.state;
        this.findAndUpdateNode(itemUpdated, tree);
        this.updateTreeState(tree);
        this.props.dispatch(codeTreeActions.update(tree));
    }

    addItem(id, dest) {
        const {tree} = this.state;
        if (!dest) dest = tree;
        const {lastIdAdded} = this.state;
        if (id !== lastIdAdded) {
            const item = createInstructionFromType(id);
            dest.push(item);
            this.setState({
                ...this.state,
                lastIdAdded: id,
            });
            this.updateTreeState(tree);
        }
    }

    findAndUpdateNode(newItem, items) {
        let {id} = newItem;
        for (let node of items) {
            if (node.id === id) {
                node.attributes = newItem.attributes;
                return node;
            }
            if (node.children && node.children.length) {
                const result = this.findAndUpdateNode(newItem, node.children);
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
        });
        const {tree} = this.state;
        this.props.dispatch(codeTreeActions.update(tree));
    }

    updateTreeState(tree) {
        this.setState({
            ...this.state,
            tree: tree
        });
    }

    render() {
        const {tree} = this.props;
        console.log(this.props);
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
                    <EmptyTreeTarget add={this.addItem.bind(this)} finishDrop={this.finishDrop.bind(this)}/>
                </div>
                <DroppableRemoveInstruction
                    remove={this.removeItem.bind(this)}
                    finishDrop={this.finishDrop.bind(this)}
                />
                <div className="playground-instructions">
                    <InstructionDraggableOnly
                        id={instructions.VariableDeclaration}
                        parent={null}
                        item={{id: instructions.VariableDeclaration, attributes: {title: 'Variable'}, children: []}}
                    />
                    <InstructionDraggableOnly
                        id={instructions.IfBlock}
                        parent={null}
                        item={{id: instructions.IfBlock, attributes: {title: 'If'}, children: []}}
                    />
                    <InstructionDraggableOnly
                        id={instructions.ForLoop}
                        parent={null}
                        item={{id: instructions.ForLoop, attributes: {title: 'For'}, children: []}}
                    />
                    <InstructionDraggableOnly
                        id={instructions.Print}
                        parent={null}
                        item={{id: instructions.Print, attributes: {title: 'Print'}, children:[]}}
                    />
                    <InstructionDraggableOnly
                        id={instructions.VariableOperation}
                        parent={null}
                        item={{id: instructions.VariableOperation, attributes: {title: 'Operation'}, children:[]}}
                    />
                </div>
            </Col>
        )
    }
}

function mapStateToProps(state) {
    const {tree} = state.code;
    return {
        tree
    };
}

const connectedPlayground = DragDropContext(HTML5Backend)(connect(mapStateToProps)(Playground));
export {connectedPlayground as Playground};
