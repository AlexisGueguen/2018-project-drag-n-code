import React from 'react';
import connect from "react-redux/es/connect/connect";
import {levelActions} from "../_actions";

class ManageLevelsPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.dispatch(levelActions.getByAuthorId(this.props.user._id));
    }


    render() {
        return <h2 className="page-title">Manage my levels</h2>;
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedManageLevelsPage = connect(mapStateToProps)(ManageLevelsPage);
export { connectedManageLevelsPage as ManageLevelsPage };