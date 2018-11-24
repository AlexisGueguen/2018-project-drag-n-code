import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {instructions} from "./instructions";
import {generateGuid} from "../../_helpers/utils";

export class VariableDeclaration extends React.Component {
    render() {
        const {index} = this.props;
        return (
            <Draggable draggableId={instructions.VariableDeclaration} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="instruction-variable"
                    >
                        New variable
                    </div>
                )}
            </Draggable>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.VariableDeclaration,
            attributes: {
                type: "",
                name: "",
                value: ""
            },
            children: null
        }
    }
}