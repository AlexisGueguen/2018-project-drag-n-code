import React from 'react'
import Tree from './Tree'
import {Col} from "react-bootstrap";
import HTML5Backend from "react-dnd-html5-backend";
import {DragDropContext} from "react-dnd";
import {initialState} from "./initialState";
import InstructionDraggableOnly from "./InstructionDraggableOnly";
import DroppableRemoveInstruction from "./DroppableRemoveInstruction";
import {VariableDeclaration} from "./Instructions";
import {connect} from "react-redux";
import {codeTreeActions} from "../../_actions";

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(codeTreeActions.init());
        this.state = initialState;
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
            const {lastIdAdded} = this.state;
            if (id !== lastIdAdded) {
                const item = VariableDeclaration.createInstruction();
                dest.push(item);
                this.setState({
                    ...this.state,
                    lastIdAdded: id,
                });
                this.updateTreeState(tree);
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

        this.updateTreeState(tree);
    }

    updateItem(itemUpdated) {
        let {tree} = this.state;
        this.findAndUpdateNode(itemUpdated, tree);
        this.updateTreeState(tree);
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
                <DroppableRemoveInstruction
                    remove={this.removeItem.bind(this)}
                    finishDrop={this.finishDrop.bind(this)}
                />
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

function mapStateToProps(state) {
    const {tree} = state.code;
    return {
        tree
    };
}

const connectedPlayground = DragDropContext(HTML5Backend)(connect(mapStateToProps)(Playground));
export {connectedPlayground as Playground};
