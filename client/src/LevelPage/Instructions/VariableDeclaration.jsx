import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {instructions} from "./instructions";
import {generateGuid} from "../../_helpers/utils";

export class VariableDeclaration extends React.Component {
    render() {
        const {index, instruction} = this.props;
        const id = instruction ? instruction.id : instructions.VariableDeclaration;
        return (
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {instruction ? (
                            <div className="instruction-variable-placed">
                                <p>{instruction.attributes.type} {instruction.attributes.name};</p>
                            </div>
                        ) : (
                            <div className="instruction-variable">Variable declaration</div>
                        )}
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
                type: "int",
                name: "test",
                value: "0"
            },
            children: null
        }
    }
}