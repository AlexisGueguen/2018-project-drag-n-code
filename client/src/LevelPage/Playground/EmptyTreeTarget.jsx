import React from 'react'
import {DropTarget} from 'react-dnd'
import PropTypes from 'prop-types';

const target = {
    drop(props, monitor) {
        props.add(monitor.getItem().id, null);
    }
};

class EmptyTreeTarget extends React.Component {
    static propTypes = {
        add: PropTypes.func.isRequired,
        finishDrop: PropTypes.func.isRequired
    };

    render() {
        const {connectDropTarget} = this.props;

        return connectDropTarget(<div className="empty-droppable-target"/>)
    }
}

export default DropTarget('ITEM', target, (connect) => ({connectDropTarget: connect.dropTarget()}))(EmptyTreeTarget);
