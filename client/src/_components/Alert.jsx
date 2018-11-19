import React from "react";
import {history} from "../_helpers";
import {alertActions} from "../_actions";
import connect from "react-redux/es/connect/connect";

class Alert extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        let html = null;
        if (alert.message) html = <div className={`${this.props.class} alert ${alert.type}`}>{alert.message}</div>;
        return html;
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(Alert);