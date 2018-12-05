import React from "react";
import PropTypes from "prop-types";
import {generateGuid} from "../../../_helpers/utils";
import {instructions} from "./instructions";
import {comparisonOperators, operators} from "./operators";

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
    }

    render() {
        return (
            <div className="instruction-for-placed">
                <b>for </b>
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
                    variable: "",
                    value: ""
                },
                condition: {
                    left: "",
                    right: "",
                    operator: comparisonOperators.moreOrEqualThan,
                },
                increment: {
                    variable: "",
                    operator: operators.equal,
                    value: ""
                }
            },
            children: []
        }
    }
}