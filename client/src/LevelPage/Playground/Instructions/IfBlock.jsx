import React from "react";
import PropTypes from "prop-types";

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
    }

    render() {
        const {item} = this.state;
        return (
            <div className="instruction-if-placed">
                {item.type}
            </div>
        )
    }

    /*static createInstruction() {
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
    }*/
}