import React from "react";
import {Col} from "react-bootstrap";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
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

        //console.log(result);

        if (combine) {
            let action = codeUtils.combineInstructions(code, source, draggableId, combine.draggableId);
            this.setState(action.code);
            this.props.dispatch(codeActions.updateCode(action));
        }

        if (!destination) return;

        if (isGuid(source.droppableId)) {
            let action = codeUtils.moveInstruction(code, source, destination, draggableId);
            this.setState(action.code);
            this.props.dispatch(codeActions.updateCode(action));
            return;
        }

        switch (destination.droppableId) {
            case source.droppableId: {
                if (destination.index !== source.index) {
                    let action = codeUtils.moveInstruction(code, source, destination, draggableId);
                    this.setState(action.code);
                    this.props.dispatch(codeActions.updateCode(action));
                }
                break;
            }
            case this.codeRootDroppableId: {
                // Create a new instruction on the playground
                let action = codeUtils.addInstruction(code, source, destination, draggableId);
                this.setState(action.code);
                this.props.dispatch(codeActions.updateCode(action));
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

    onDragUpdate = update => {
        console.log("Update");
        console.log(update);
    };

    renderPlaygroundCode(code) {
        return this.renderSubTree(code[0])
    }

    renderSubTree(subTree) {
        const {children} = subTree;
        return subTree && children && subTree.children.map((instr, index) => {
            switch (instr.type) {
                case instructions.Root:
                    {instr && instr.children && this.renderSubTree(instr)}
                    break;
                case instructions.IfBlock:
                    return <IfBlock key={instr.id} index={index} instruction={instr}>
                        {instr && instr.children && this.renderSubTree(instr)}
                    </IfBlock>;
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
                <DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
                    <Droppable droppableId="code-root" isCombineEnabled isDroppableDisabled={true}>
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
                                <Draggable draggableId={instructions.VariableDeclaration} index={0}>
                                    {provided => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="instruction"
                                        >
                                            Variable
                                        </div>
                                    )}
                                </Draggable>
                                <Draggable draggableId={instructions.IfBlock} index={1}>
                                    {provided => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="instruction"
                                        >
                                            If block
                                        </div>
                                    )}
                                </Draggable>
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