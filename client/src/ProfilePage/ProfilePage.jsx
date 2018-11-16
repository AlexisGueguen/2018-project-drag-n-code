import React from 'react';
import connect from "react-redux/es/connect/connect";

class ProfilePage extends React.Component {
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

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };