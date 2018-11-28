import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {VariableDeclaration, IfBlock} from "./Instructions/index";
import {instructions} from "./Instructions/instructions";
import connect from "react-redux/es/connect/connect";
import {codeActions} from "../../_actions/code.actions";
import {isGuid} from "../../_helpers/utils";
import {codeInitialState} from "../../_reducers/code.reducer";
import {codeUtils} from "./codeUtils";

class Playground extends React.Component {

    codeRootDroppableId = "code-root";
    instructionDroppableId = 'instructions-droppable';

    constructor(props) {
        super(props);
        this.props.dispatch(codeActions.init());
        this.state = codeInitialState;
    }

    onDragEnd = result => {
        const {destination, source, draggableId, combine} = result;
        const {code} = this.props;

        console.log(result);

        if (combine) {
            this.props.dispatch(codeActions.updateCode(
                codeUtils.combineInstructions(code, source, draggableId, combine.draggableId)
            ));
        }

        if (!destination) return;

        if (isGuid(source.droppableId)) {
            this.props.dispatch(codeActions.updateCode(
                codeUtils.moveInstruction(code, source, destination, draggableId)
            ));
            return;
        }

        switch (destination.droppableId) {
            case source.droppableId: {
                if (destination.index !== source.index) {
                    this.props.dispatch(codeActions.updateCode(
                        codeUtils.moveInstruction(code, source, destination, draggableId)
                    ));
                }
                break;
            }
            case this.codeRootDroppableId: {
                // Create a new instruction on the playground
                this.props.dispatch(codeActions.updateCode(
                    codeUtils.addInstruction(code, source, destination, draggableId)
                ));
                break;
            }
            case this.instructionDroppableId: {
                // Remove an instruction from the playground
                let action = codeUtils.removeInstruction(code, draggableId);
                this.setState(action.code);
                this.props.dispatch(codeActions.updateCode(action));
                break;
            }
            default:
                throw new Error(`Destination (${destination.droppableId}) is not handled.`);
        }
    };

    renderPlaygroundCode(code) {
        const {children} = code[0];
        return code && children && children.map((instr, index) => {
            switch (instr.type) {
                case instructions.IfBlock:
                    return <IfBlock key={instr.id} index={index} instruction={instr}/>;
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
            <Col sm={7} md={7} className="playground">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="code-root" isCombineEnabled>
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
                                <IfBlock index={1}/>
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
    const {code} = state.code;
    return {
        code
    };
}

const connectedPlayground = connect(mapStateToProps)(Playground);
export {connectedPlayground as Playground};

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