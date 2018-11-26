import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {VariableDeclaration} from "./Instructions";
import {instructions} from "./Instructions/instructions";
import connect from "react-redux/es/connect/connect";
import {codeActions} from "../_actions/code.actions";

class Playground extends React.Component {

    codeDroppableId = 'code-droppable';
    instructionDroppableId = 'instructions-droppable';

    constructor(props) {
        super(props);
        this.props.dispatch(codeActions.init());
        this.state = {code: []};
    }

    onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if (!destination) return;

        switch (destination.droppableId) {
            case source.droppableId: {
                if (destination.index !== source.index) {
                    const {code} = this.props;
                    this.props.dispatch(codeActions.moveInstruction(code, source, destination, draggableId));
                }
                break;
            }
            case this.codeDroppableId: {
                // Create a new instruction on the playground
                const {code} = this.props;
                this.props.dispatch(codeActions.addInstruction(code, source, destination, draggableId));
                break;
            }
            case this.instructionDroppableId: {
                // Remove an instruction from the playground
                const code = Array.from(this.state.code);
                const index = code.indexOf(x=>x.id === draggableId);
                code.splice(index, 1);
                this.props.dispatch(codeActions.removeInstruction(code, draggableId));
                break;
            }
            default:
                throw new Error(`Destination (${destination.droppableId}) is not handled.`);
        }
        this.render();
    };

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

    componentWillReceiveProps(nextProps) {
        this.setState({
            code: nextProps.code
        });
    }
}

function mapStateToProps(state) {
    const { code } = state.code;
    return {
        code
    };
}

const connectedPlayground = connect(mapStateToProps)(Playground);
export { connectedPlayground as Playground };

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