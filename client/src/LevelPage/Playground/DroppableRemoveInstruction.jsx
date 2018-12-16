import React from 'react'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types';

const target = {
    drop(props, monitor) {
        const {id: draggedId} = monitor.getItem();

        if (!monitor.isOver({shallow: true})) return;

        props.remove(draggedId);
        props.finishDrop();
    }
};

class DroppableRemoveInstruction extends React.Component {
    static propTypes = {
        remove: PropTypes.func.isRequired,
        finishDrop: PropTypes.func.isRequired
    };

    render() {
        const {connectDropTarget, isOver} = this.props;

        return connectDropTarget(
            <div className="remove-instruction-panel">
                <div className={"remove-instruction-content " + (isOver ? "isOver" : "")}>
                    <span className="glyphicon glyphicon-trash "/>
                </div>
            </div>
        )
    }
}

export default DropTarget('ITEM', target, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
}))(DroppableRemoveInstruction);
