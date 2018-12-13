import React from "react";
import PropTypes from "prop-types";
import {generateGuid} from "../../../_helpers/utils";
import {instructions} from "./instructions";
import {comparisonOperators, assignmentOperators, isIncrementOrDecrement} from "./operators";
import {variableType} from "./types";
import Select from "react-select";

export class ForLoop extends React.Component {

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
        this.onLoopVariableNameChange = this.onLoopVariableNameChange.bind(this);
        this.onLoopVariableValueChange = this.onLoopVariableValueChange.bind(this);
        this.onLoopLeftConditionVariableChange = this.onLoopLeftConditionVariableChange.bind(this);
        this.onLoopRightConditionVariableChange = this.onLoopRightConditionVariableChange.bind(this);
        this.onLoopIncrementNameChange = this.onLoopIncrementNameChange.bind(this);
        this.onLoopIncrementValueChange = this.onLoopIncrementValueChange.bind(this);
    }

    onLoopVariableNameChange(e) {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            initialization: {
                ...item.attributes.initialization,
                name: e.target.value
            }
        };
        this.updateItemAttributes(newAttributes);
    }

    onLoopVariableValueChange(e) {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            initialization: {
                ...item.attributes.initialization,
                value: e.target.value
            }
        };
        this.updateItemAttributes(newAttributes);
    }

    onLoopVariableTypeChange = (selectedOption) => {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            initialization: {
                ...item.attributes.initialization,
                type: selectedOption.value
            }
        };
        this.updateItemAttributes(newAttributes);
    };

    onLoopLeftConditionVariableChange(e) {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            condition: {
                ...item.attributes.condition,
                left: e.target.value
            }
        };
        this.updateItemAttributes(newAttributes);
    }

    onLoopRightConditionVariableChange(e) {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            condition: {
                ...item.attributes.condition,
                right: e.target.value
            }
        };
        this.updateItemAttributes(newAttributes);
    }

    onLoopConditionOperatorChange = (selectedOption) => {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            condition: {
                ...item.attributes.condition,
                operator: selectedOption.value
            }
        };
        this.updateItemAttributes(newAttributes);
    };

    onLoopIncrementNameChange(e) {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            increment: {
                ...item.attributes.increment,
                variable: e.target.value
            }
        };
        this.updateItemAttributes(newAttributes);
    }

    onLoopIncrementValueChange(e) {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            increment: {
                ...item.attributes.increment,
                value: e.target.value
            }
        };
        this.updateItemAttributes(newAttributes);
    }

    onLoopIncrementOperatorChange = (selectedOption) => {
        const {item} = this.state;
        const newAttributes = {
            ...item.attributes,
            increment: {
                ...item.attributes.increment,
                operator: selectedOption.value
            }
        };
        this.updateItemAttributes(newAttributes);
    };

    updateItemAttributes(attributes) {
        const {item} = this.state;
        const newItem = {
            ...item,
            attributes: attributes
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
            <div className="instruction-for-placed">
                <b>for </b>

                <div className="loop-variable-type-dropdown">
                    <Select
                        value={{value: item.attributes.initialization.type, label: item.attributes.initialization.type}}
                        onChange={this.onLoopVariableTypeChange}
                        options={[
                            {value: variableType.int, label: variableType.int},
                            {value: variableType.float, label: variableType.float},
                            {value: variableType.double, label: variableType.double}
                        ]}
                    />
                </div>
                <input className="loop-variable-name" type="text" value={item.attributes.initialization.name}
                       onChange={this.onLoopVariableNameChange}/>
                <b> = </b>
                <input className="loop-variable-value" type="text" value={item.attributes.initialization.value}
                       onChange={this.onLoopVariableValueChange}/>

                <b> ; </b>

                <input className="loop-condition-left" type="text" value={item.attributes.condition.left}
                       onChange={this.onLoopLeftConditionVariableChange}/>
                <div className="loop-condition-operator-dropdown">
                    <Select
                        onChange={this.onLoopConditionOperatorChange}
                        value={{value: item.attributes.condition.operator, label: item.attributes.condition.operator}}
                        options={[
                            {value: comparisonOperators.equal, label: comparisonOperators.equal},
                            {value: comparisonOperators.notEqual, label: comparisonOperators.notEqual},
                            {value: comparisonOperators.moreThan, label: comparisonOperators.moreThan},
                            {value: comparisonOperators.moreOrEqualThan, label: comparisonOperators.moreOrEqualThan},
                            {value: comparisonOperators.lessThan, label: comparisonOperators.lessThan},
                            {value: comparisonOperators.lessOrEqualThan, label: comparisonOperators.lessOrEqualThan},
                        ]}
                    />
                </div>
                <input className="loop-condition-right" type="text" value={item.attributes.condition.right}
                       onChange={this.onLoopRightConditionVariableChange}/>

                <b> ; </b>

                <input className="loop-condition-left" type="text" value={item.attributes.increment.variable}
                       onChange={this.onLoopIncrementNameChange}/>
                <div className="loop-condition-operator-dropdown">
                    <Select
                        onChange={this.onLoopIncrementOperatorChange}
                        value={{value: item.attributes.increment.operator, label: item.attributes.increment.operator}}
                        options={[
                            {value: assignmentOperators.plusPlus, label: assignmentOperators.plusPlus},
                            {value: assignmentOperators.minusMinus, label: assignmentOperators.minusMinus},
                            {value: assignmentOperators.plusEqual, label: assignmentOperators.plusEqual},
                            {value: assignmentOperators.minusEqual, label: assignmentOperators.minusEqual},
                            {value: assignmentOperators.multiplyEqual, label: assignmentOperators.multiplyEqual},
                            {value: assignmentOperators.divideEqual, label: assignmentOperators.divideEqual},
                            {value: assignmentOperators.equal, label: assignmentOperators.equal}
                        ]}
                    />
                </div>
                {
                    !isIncrementOrDecrement(item.attributes.increment.operator) &&
                    <input className="loop-condition-right" type="text" value={item.attributes.increment.value}
                           onChange={this.onLoopIncrementValueChange}/>
                }
            </div>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.ForLoop,
            droppable: true,
            attributes: {
                initialization: {
                    type: "int",
                    name: "i",
                    value: "0"
                },
                condition: {
                    left: "i",
                    right: "1",
                    operator: comparisonOperators.lessOrEqualThan,
                },
                increment: {
                    variable: "i",
                    operator: assignmentOperators.plusPlus,
                    value: "1"
                }
            },
            children: []
        }
    }
}