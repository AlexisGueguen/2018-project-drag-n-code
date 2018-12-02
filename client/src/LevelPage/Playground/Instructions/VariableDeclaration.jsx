import React from "react";
import PropTypes from 'prop-types';
import {instructions} from "./instructions";
import {generateGuid} from "../../../_helpers/utils";

export class VariableDeclaration extends React.Component {

    static propTypes = {
        item: PropTypes.any.isRequired,
        update: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const {item} = this.props;
        this.state = {
            item: item
        };
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(e) {
        const {item} = this.state;
        const {attributes} = item;
        const newItem = {
            ...item,
            attributes: {
                ...attributes,
                name: e.target.value
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
                    <div
                        className="instruction-variable-placed"
                    >
                        <div>{item.attributes.type}</div>
                        <div><input type="text" value={item.attributes.name} onChange={this.onNameChange}/></div>
                    </div>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.VariableDeclaration,
            droppable: false,
            attributes: {
                type: "var",
                name: "a",
                value: ""
            },
            children: []
        }
    }
}