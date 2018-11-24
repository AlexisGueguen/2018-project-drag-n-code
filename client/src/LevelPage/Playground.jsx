import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {VariableDeclaration} from "./Instructions";
import {instructions} from "./Instructions/instructions";

const initialState = {
    code: []
};

export default class Playground extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId
            && destination.index === source.index
        ) {
            return; // If the location hasn't change, we don't update.
        }

        if (destination.droppableId === 'code-droppable') {
            console.log('On Drag End');
            const newCode = Array.from(this.state.code);
            const newInstruction = createInstructionFromId(draggableId);
            console.log(newInstruction);
            newCode.splice(destination.index, 0, newInstruction);
            const newState = {
                ...this.state,
                code: newCode
            };
            this.setState(newState);
        }
    };

    render() {
        const {code} = this.state;
        return (
            <Col sm={7} md={8} className="playground">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="code-droppable">
                        {provided => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="playground-code">
                                {code && code.map(instr => <div key={instr.id}>{instr.id}</div>)}
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
    switch(id) {
        case instructions.VariableDeclaration:
            instruction = VariableDeclaration.createInstruction();
            break;
        default:
            throw "Instruction with the id {id} is unrecognized by the system.";
    }
    return instruction;
}