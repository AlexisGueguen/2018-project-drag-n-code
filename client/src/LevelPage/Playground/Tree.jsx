import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types';
import Instruction from "./Instruction";
import InstructionDraggableOnly from "./InstructionDraggableOnly";

const target = {
    drop(props) {
        props.finishDrop()
    },

    hover(props, monitor) {
        const {id: draggedId, parent, items} = monitor.getItem();

        if (!monitor.isOver({shallow: true})) return;

        const descendantNode = props.find(props.parent, items);
        if (descendantNode) return;
        if (parent === props.parent || draggedId === props.parent) return;

        props.move(draggedId, props.id, props.parent)
    }
};

class Tree extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        parent: PropTypes.any,
        move: PropTypes.func.isRequired,
        find: PropTypes.func.isRequired,
        finishDrop: PropTypes.func.isRequired
    };

    render() {
        const {connectDropTarget, items, parent, move, find, finishDrop} = this.props;

        return connectDropTarget(
            <div className={parent ? 'tree' : 'first-tree'}>
                {items.map((item, i) => {
                    return (
                        item.droppable ? (
                            <Instruction
                                key={item.id}
                                id={item.id}
                                parent={parent}
                                item={item}
                                move={move}
                                find={find}
                                finishDrop={finishDrop}
                            />
                        ) : (
                            <InstructionDraggableOnly
                                key={item.id}
                                id={item.id}
                                parent={parent}
                                item={item}
                                move={move}
                                find={find}
                            />
                        )
                    )
                })}
            </div>
        )
    }
}

export default DropTarget('ITEM', target, (connect, monitor) => ({connectDropTarget: connect.dropTarget()}))(Tree);
