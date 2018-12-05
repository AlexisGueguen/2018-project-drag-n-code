import React from "react";
import PropTypes from "prop-types";
import {generateGuid} from "../../../_helpers/utils";
import {instructions} from "./instructions";
import {comparisonOperators} from "./operators";
import Select from "react-select";

export class IfBlock extends React.Component {

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
        this.onLeftChange.bind(this);
        this.onRightChange.bind(this);
        this.onOperatorChange.bind(this);
    }

    render() {
        const {item} = this.state;
        return (
            <div className="instruction-if-placed">
                <b>if </b>
                {item.attributes.predicates && item.attributes.predicates.map(
                    (predicate, index) => <div key={index} className="predicate">
                        <input className="left" type="text" value={predicate.left || ''} onChange={(e) => this.onLeftChange(index, e)}/>
                        <div className="operator-dropdown">
                            <Select
                                value={{value: predicate.operator, label: predicate.operator}}
                                onChange={(e) => this.onOperatorChange(index, e)}
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
                        <input className="right" type="text" value={predicate.right || ''} onChange={(e) => this.onRightChange(index, e)}/>
                    </div>
                )}
            </div>
        )
    }

    onOperatorChange(index, e) {
        const {item} = this.state;
        item.attributes.predicates[index].operator = e.value;
        this.setState({
            ...this.state,
            item: item
        });
        this.props.update(item);
    };

    onLeftChange(index, e) {
        const {item} = this.state;
        item.attributes.predicates[index].left = e.target.value;
        this.setState({
            ...this.state,
            item: item
        });
        this.props.update(item);
    }

    onRightChange(index, e) {
        const {item} = this.state;
        item.attributes.predicates[index].right = e.target.value;
        this.setState({
            ...this.state,
            item: item
        });
        this.props.update(item);
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.IfBlock,
            droppable: false,
            attributes: {
                predicates: [
                    {
                        left: "",
                        right: "",
                        operator: comparisonOperators.equal,
                        aggregator: null
                    }
                ]
            },
            children: []
        }
    }
}