import React from "react";
import PropTypes from 'prop-types';
import {instructions} from "./instructions";
import {generateGuid} from "../../../_helpers/utils";
import {variableType} from "./types";
import Select from "react-select";

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
        this.onValueChange = this.onValueChange.bind(this);
    }

    onNameChange(e) {
        this.updateItemAttribute('name', e.target.value);
    }

    onValueChange(e) {
        this.updateItemAttribute('value', e.target.value);
    }

    onTypeChange = (selectedOption) => {
        this.updateItemAttribute('type', selectedOption.value);
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
            <div className="instruction-variable-placed">
                <div className="type-dropdown">
                    <Select
                        value={{value: item.attributes.type, label: item.attributes.type}}
                        onChange={this.onTypeChange}
                        options={[
                            {value: variableType.int, label: variableType.int},
                            {value: variableType.float, label: variableType.float},
                            {value: variableType.double, label: variableType.double}
                        ]}
                    />
                </div>
                <input className="variable-name" type="text" value={item.attributes.name} onChange={this.onNameChange}/>
                <b> = </b>
                <input className="variable-value" type="text" value={item.attributes.value}
                       onChange={this.onValueChange}/>
            </div>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.VariableDeclaration,
            droppable: false,
            attributes: {
                type: variableType.int,
                name: "a",
                value: "0"
            },
            children: []
        }
    }
}