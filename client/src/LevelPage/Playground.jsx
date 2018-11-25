import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {VariableDeclaration} from "./Instructions";
import {instructions} from "./Instructions/instructions";

const initialState = {
    code: []
};

export default class Playground extends React.Component {

    codeDroppableId = 'code-droppable';
    instructionDroppableId = 'instructions-droppable';

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) return;

        switch (destination.droppableId) {
            case source.droppableId: {
                if (destination.index !== source.index) {
                    const newCode = Array.from(this.state.code);
                    const instruction = newCode[source.index];
                    newCode.splice(source.index, 1);
                    newCode.splice(destination.index, 0, instruction);
                    this.updateCode(newCode);
                }
                break;
            }
            case this.codeDroppableId: {
                // Create a new instruction on the playground
                const newCode = Array.from(this.state.code);
                const newInstruction = createInstructionFromId(draggableId);
                newCode.splice(destination.index, 0, newInstruction);
                this.updateCode(newCode);
                break;
            }
            case this.instructionDroppableId: {
                // Remove an instruction from the playground
                const newCode = Array.from(this.state.code);
                newCode.splice(source.index, 1);
                this.updateCode(newCode);
                break;
            }
            default:
                throw new Error(`Destination (${destination.droppableId}) is not handled.`);
        }
    };

    updateCode(newCode) {
        const newState = {
            ...this.state,
            code: newCode
        };
        this.setState(newState);
    }

    renderPlaygroundCode(code) {
        return code && code.map((instr, index) => {
            switch (instr.type) {
                case instructions.VariableDeclaration:
                    return <VariableDeclaration key={instr.id} instruction={instr} index={index}/>;
                default:
                    throw new Error(`Instruction (${instr.type}) unknown.`);
            }
        });
    }

    render() {
        const {code} = this.state;
        return (
            <Col sm={7} md={8} className="playground">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="code-droppable">
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="playground-code">
                                {code && this.renderPlaygroundCode(code)}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="instructions-droppable">
                        {provided => (
                            <PlaygroundInstructions
                                provided={provided}
                                innerRef={provided.innerRef}
                            >
                                <VariableDeclaration index={0}/>
                                {provided.placeholder}
                            </PlaygroundInstructions>
                        )}
                    </Droppable>
                </DragDropContext>
            </Col>
        );
    }
}

class PlaygroundInstructions extends React.Component {
    render() {
        const {provided, innerRef, children} = this.props;
        return (
            <div {...provided.droppableProps} ref={innerRef} className="playground-instructions">
                {children}
            </div>
        );
    }
}

function createInstructionFromId(id) {
    let instruction;
    switch (id) {
        case instructions.VariableDeclaration:
            instruction = VariableDeclaration.createInstruction();
            break;
        default:
            throw new Error("Instruction with the id {id} is unrecognized by the system.");
    }
    return instruction;
}