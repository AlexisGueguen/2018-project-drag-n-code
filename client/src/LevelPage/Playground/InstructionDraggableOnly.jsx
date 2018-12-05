import React from 'react'
import {DragSource} from 'react-dnd'
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

class InstructionDraggableOnly extends React.Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        parent: PropTypes.any,
        item: PropTypes.object,
        move: PropTypes.func,
        find: PropTypes.func,
        update: PropTypes.func
    };

    render() {
        const {
            connectDragPreview,
            connectDragSource,
            item,
            update
        } = this.props;

        return connectDragPreview(connectDragSource(renderInstructionContent(item, update)))
    }
}

export default DragSource('ITEM', source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))(InstructionDraggableOnly);
