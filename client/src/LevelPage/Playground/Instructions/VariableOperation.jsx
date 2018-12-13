import React from "react";
import PropTypes from "prop-types";
import {generateGuid} from "../../../_helpers/utils";
import {instructions} from "./instructions";
import {arithmeticOperators, assignmentOperators, isBinaryOperator, isIncrementOrDecrement} from "./operators";
import Select from "react-select";

export class VariableOperation extends React.Component {

    static propTypes = {
        item: PropTypes.any.isRequired,
        update: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const {item} = props;
        this.state = {
            item: item
        };
        this.onLeftChange = this.onLeftChange.bind(this);
        this.onRightChange = this.onRightChange.bind(this);
        this.onVariableChange = this.onVariableChange.bind(this);
    }

    onVariableChange(e) {
        this.updateItemAttribute('variable', e.target.value);
    }

    onLeftChange(e) {
        this.updateItemAttribute('left', e.target.value);
    }

    onRightChange(e) {
        this.updateItemAttribute('right', e.target.value);
    }

    onAssignmentOperatorChange = (selectedOption) => {
        this.updateItemAttribute('assignmentOperator', selectedOption.value);
    };

    onOperatorChange = (selectedOption) => {
        this.updateItemAttribute('operator', selectedOption.value);
    };

    updateItemAttribute(attribute, value) {
        const {item} = this.state;
        const {attributes} = item;
        const newItem = {
            ...item,
            attributes: {
                ...attributes,
                [attribute]: value
            }
        };
        this.setState({
            ...this.state,
            item: newItem
        });
        this.props.update(newItem);
    }

    render() {
        const {item} = this.state;
        return (
            <div className="instruction-operation-placed">
                <input className="operation-variable" type="text" value={item.attributes.variable}
                       onChange={this.onVariableChange}/>
                <div className="operation-assignment-dropdown">
                    <Select
                        onChange={this.onAssignmentOperatorChange}
                        value={{value: item.attributes.operator, label: item.attributes.assignmentOperator}}
                        options={[
                            {value: assignmentOperators.equal, label: assignmentOperators.equal},
                            {value: assignmentOperators.plusPlus, label: assignmentOperators.plusPlus},
                            {value: assignmentOperators.minusMinus, label: assignmentOperators.minusMinus},
                            {value: assignmentOperators.plusEqual, label: assignmentOperators.plusEqual},
                            {value: assignmentOperators.minusEqual, label: assignmentOperators.minusEqual},
                            {value: assignmentOperators.multiplyEqual, label: assignmentOperators.multiplyEqual},
                            {value: assignmentOperators.divideEqual, label: assignmentOperators.divideEqual}
                        ]}
                    />
                </div>
                {
                    !isIncrementOrDecrement(item.attributes.assignmentOperator) &&
                    <div style={{display: 'flex'}}>
                        <input className="operation-left" type="text" value={item.attributes.left}
                               onChange={this.onLeftChange}/>
                        {
                            isBinaryOperator(item.attributes.assignmentOperator) &&
                            <div style={{display: 'flex'}}>
                                <div className="operation-operator-dropdown">
                                    <Select
                                        onChange={this.onOperatorChange}
                                        value={{value: item.attributes.operator, label: item.attributes.operator}}
                                        options={[
                                            {value: '', label: 'none'},
                                            {value: arithmeticOperators.addition, label: arithmeticOperators.addition},
                                            {value: arithmeticOperators.multiplication, label: arithmeticOperators.multiplication},
                                            {value: arithmeticOperators.subtraction, label: arithmeticOperators.subtraction},
                                            {value: arithmeticOperators.division, label: arithmeticOperators.division},
                                            {value: arithmeticOperators.modulo, label: arithmeticOperators.modulo},
                                        ]}
                                    />
                                </div>
                                {
                                    item.attributes.operator !== '' && 
                                    <input className="operation-right" type="text" value={item.attributes.right}
                                           onChange={this.onRightChange}/>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.VariableOperation,
            droppable: false,
            attributes: {
                variable: "a",
                left: "1",
                operator: arithmeticOperators.addition,
                right: "1",
                assignmentOperator: assignmentOperators.equal
            },
            children: []
        }
    }
}