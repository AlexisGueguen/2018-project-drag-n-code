import React from "react";
import PropTypes from 'prop-types';
import {instructions} from "./instructions";
import {generateGuid} from "../../../_helpers/utils";
import Select from "react-select";

export class PrintInstruction extends React.Component {

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
        this.onValueChange = this.onValueChange.bind(this);
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
            <div className="instruction-print-placed">
                <b> print </b>
                <div className="type-dropdown">
                    <Select
                        onChange={this.onTypeChange}
                        value={{value: item.attributes.type, label: item.attributes.type}}
                        options={[
                            {value: printType.text, label: printType.text},
                            {value: printType.variable, label: printType.variable}
                        ]}
                    />
                </div>
                <input className="print-value" type="text" value={item.attributes.value}
                       onChange={this.onValueChange}/>
            </div>
        )
    }

    static createInstruction() {
        return {
            id: generateGuid(),
            type: instructions.Print,
            droppable: false,
            attributes: {
                type: printType.text,
                value: "Hello"
            },
            children: []
        }
    }
}

export const printType = {
    variable: 'Variable',
    text: 'Text'
};
