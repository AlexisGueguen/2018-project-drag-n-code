import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext} from 'react-beautiful-dnd';
import {Droppable} from 'react-beautiful-dnd';
import {Draggable} from 'react-beautiful-dnd';

export default class Playground extends React.Component {

    onDragEnd = result => {

    };

    render() {
        return (
            <Col sm={7} md={8} className="playground">
                <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="code-droppable">
                            {provided => (
                                <PlaygroundInstructions
                                    provided={provided}
                                    innerRef={provided.innerRef}
                                >
                                    {provided.placeholder}
                                </PlaygroundInstructions>
                            )}
                        </Droppable>

                        <Droppable droppableId="instructions-droppable">
                            {provided => (
                                <PlaygroundCode
                                    provided={provided}
                                    innerRef={provided.innerRef}
                                >
                                    <InstructionVariable index={0} id="0" />
                                    <InstructionVariable index={1} id="1"/>
                                    {provided.placeholder}
                                </PlaygroundCode>
                            )}
                        </Droppable>
                </DragDropContext>
            </Col>
        );
    }
}

class InstructionVariable extends React.Component {
    render() {
        const {index, id} = this.props;
        return (
            <Draggable draggableId={id} index={index}>
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

class PlaygroundCode extends React.Component {
    render() {
        const {provided, innerRef, children} = this.props;
        return (
            <div {...provided.droppableProps} ref={innerRef} className="playground-code">
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