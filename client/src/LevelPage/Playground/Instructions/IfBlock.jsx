import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {instructions} from "./instructions";
import {generateGuid} from "../../../_helpers/utils";
import {connect} from "react-redux";
import {VariableDeclaration} from "./VariableDeclaration";

class IfBlock extends React.Component {

    constructor(props) {
        super(props);
        const {instruction} = props;
        this.state = {
            instruction: instruction
        };
    }

    renderPlaygroundCode(instruction) {
        const {children} = instruction;
        return children && children.map((instr, index) => {
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
        const {index} = this.props;
        const {instruction} = this.state;
        const id = instruction ? instruction.id : instructions.IfBlock;
        return (
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {instruction ? (
                            <div className="instruction-if-placed">
                                {instruction.type}
                                <Droppable droppableId={instruction.id} isCombineEnabled>
                                    {provided => (
                                        <div {...provided.droppableProps} ref={provided.innerRef} className="playground-code">
                                            {instruction && this.renderPlaygroundCode(instruction)}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ) : (
                            <div className="instruction">If block</div>
                        )}
                    </div>
                )}
            </Draggable>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.IfBlock,
            attributes: {
                predicates: [
                    {
                        left: "",
                        right: "",
                        operator: "",
                        aggregator: null
                    }
                ]
            },
            children: null
        }
    }
}

function mapStateToProps(state) {
    const {code} = state.code;
    return {
        code
    };
}

const connectedIf = connect(mapStateToProps)(IfBlock);
export {connectedIf as IfBlock};