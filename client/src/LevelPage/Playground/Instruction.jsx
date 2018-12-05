import React, {Component} from 'react'
import {DragSource, DropTarget} from 'react-dnd'
import Tree from './Tree'
import flow from 'lodash/flow';
import PropTypes from 'prop-types';
import {renderInstructionContent} from "./renderInstructionContent";

const source = {
    beginDrag(props) {
        return {
            id: props.id,
            parent: props.parent,
            items: props.item.children
        }
    },

    isDragging(props, monitor) {
        return props.id === monitor.getItem().id
    }
};

const target = {
    canDrop() {
        return false
    },

    hover(props, monitor) {
        const {id: draggedId} = monitor.getItem();
        const {id: overId} = props;

        if (draggedId === overId || draggedId === props.parent) return;
        if (!monitor.isOver({shallow: true})) return;

        props.move(draggedId, overId, props.parent);
    },

    drop(props) {
        props.finishDrop();
    }
};

class Instruction extends Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        parent: PropTypes.any,
        item: PropTypes.object,
        move: PropTypes.func,
        find: PropTypes.func,
        update: PropTypes.func.isRequired,
        finishDrop: PropTypes.func
    };

    render() {
        const {
            connectDropTarget,
            connectDragPreview,
            connectDragSource,
            item,
            move,
            find,
            update,
            finishDrop
        } = this.props;

        return connectDropTarget(connectDragPreview(
            <div>
                {connectDragSource(renderInstructionContent(item, update))}
                <Tree
                    parent={item.id}
                    items={item.children}
                    move={move}
                    find={find}
                    update={update}
                    finishDrop={finishDrop}
                />
            </div>
        ))
    }
}

export default flow(
    DragSource('ITEM', source, (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    })),
    DropTarget('ITEM', target, connect => ({
        connectDropTarget: connect.dropTarget()
    }))
)(Instruction);
