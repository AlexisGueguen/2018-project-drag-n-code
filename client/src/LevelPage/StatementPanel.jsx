import React from "react";

export default class StatementPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        };

        this.onExpandClick = this.onExpandClick.bind(this);
    }

    onExpandClick() {
        const {expanded} = this.state;
        this.setState({
           expanded: !expanded
        });
    }

    render() {
        const {value} = this.props;
        const {expanded} = this.state;
        return (
            <div className="statement">
                <h3>
                    Statement
                    <span className={expanded ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down'} onClick={this.onExpandClick}/>
                </h3>
                {expanded && <p>{value}</p>}
            </div>
        );
    }
}