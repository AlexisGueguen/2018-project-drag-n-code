import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {instructions} from "./instructions";
import {generateGuid} from "../../_helpers/utils";

export class VariableDeclaration extends React.Component {

    constructor(props) {
        super(props);
        const {instruction} = this.props;
        this.state = {
            instruction: instruction
        };
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(e) {
        const {instruction} = this.state;
        const {attributes} = instruction;
        const newInstruction = {
            ...instruction,
            attributes: {
                ...attributes,
                name: e.target.value
            }
        };
        this.setState({
            ...this.state,
            instruction: newInstruction
        });
    }

    render() {
        const {index} = this.props;
        const {instruction} = this.state;
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
                                <div>{instruction.attributes.type}</div>
                                <div><input type="text" value={instruction.attributes.name} onChange={this.onNameChange}/></div>
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
                type: "var",
                name: "variable",
                value: ""
            },
            children: null
        }
    }
}