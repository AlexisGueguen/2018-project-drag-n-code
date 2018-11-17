import React from 'react';
import connect from "react-redux/es/connect/connect";

class SettingsPage extends React.Component {
    render() {
        return null;
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedSettingsPage = connect(mapStateToProps)(SettingsPage);
export { connectedSettingsPage as SettingsPage };