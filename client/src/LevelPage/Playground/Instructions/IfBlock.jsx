import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {instructions} from "./instructions";
import {generateGuid} from "../../../_helpers/utils";
import {connect} from "react-redux";

class IfBlock extends React.Component {

    constructor(props) {
        super(props);
        const {instruction} = props;
        this.state = {
            instruction: instruction
        };
    }

    render() {
        const {index, children} = this.props;
        const {instruction} = this.state;
        return (
            <Draggable draggableId={instruction.id} index={index}>
                {provided => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="instruction-if-placed"
                    >
                        {instruction.type}
                        <Droppable droppableId={instruction.id}>
                            {provided2 => (
                                <div
                                    {...provided2.droppableProps}
                                    ref={provided2.innerRef}
                                    className="playground-code"
                                >
                                    {children}
                                </div>
                            )}
                        </Droppable>
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