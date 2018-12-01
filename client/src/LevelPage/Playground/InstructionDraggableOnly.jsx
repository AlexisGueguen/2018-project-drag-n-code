import React, {Component} from 'react'
import {DragSource} from 'react-dnd'
import PropTypes from 'prop-types';

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

class InstructionDraggableOnly extends Component {
    static propTypes = {
        id: PropTypes.any.isRequired,
        parent: PropTypes.any,
        item: PropTypes.object,
        move: PropTypes.func,
        find: PropTypes.func
    };

    render() {
        const {
            connectDragPreview,
            connectDragSource,
            item,
            parent
        } = this.props;

        return connectDragPreview(connectDragSource(
            <div className="instruction">
                {item.attributes.title} - {item.id}
            </div>
        ))
    }
}

export default DragSource('ITEM', source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))(InstructionDraggableOnly);
