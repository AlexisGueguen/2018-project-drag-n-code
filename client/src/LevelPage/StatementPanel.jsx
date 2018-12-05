import React from "react";

export default class StatementPanel extends React.Component {
    render() {
        const {value} = this.props;
        return (
            <div className="statement">
                <h3>Statement</h3>
                <p>{value}</p>
            </div>
        );
    }
}