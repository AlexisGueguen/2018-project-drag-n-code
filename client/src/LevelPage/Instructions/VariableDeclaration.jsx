import React from "react";
import {Draggable} from "react-beautiful-dnd";

export class VariableDeclaration extends React.Component {
    render() {
        const {index, id} = this.props;
        return (
            <Draggable draggableId={"variable"+id} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="instruction-variable"
                    >
                        Variable {index}
                    </div>
                )}
            </Draggable>
        )
    }
}