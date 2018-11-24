import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {VariableDeclaration} from "./Instructions";

export default class Playground extends React.Component {

    state = {
        code: []
    };

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
            newCode.splice(destination.index, 0, draggableId);
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
                            <PlaygroundCode
                                provided={provided}
                                innerRef={provided.innerRef}
                                code={code}
                            >
                                {provided.placeholder}
                            </PlaygroundCode>
                        )}
                    </Droppable>
                    <Droppable droppableId="instructions-droppable">
                        {provided => (
                            <PlaygroundInstructions
                                provided={provided}
                                innerRef={provided.innerRef}
                            >
                                <VariableDeclaration index={0} id={0}/>
                                <VariableDeclaration index={1} id={1}/>
                                {provided.placeholder}
                            </PlaygroundInstructions>
                        )}
                    </Droppable>
                </DragDropContext>
            </Col>
        );
    }
}

class PlaygroundCode extends React.Component {
    render() {
        const {provided, innerRef, children, code} = this.props;
        return (
            <div {...provided.droppableProps} ref={innerRef} className="playground-code">
                {code && code.map(instr => <div key={instr}>{instr}</div>)}
                {children}
            </div>
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