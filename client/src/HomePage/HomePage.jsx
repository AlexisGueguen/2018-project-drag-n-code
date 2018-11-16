import React from 'react';
import { connect } from 'react-redux';


class HomePage extends React.Component {

    render() {
        return (
            <div className="bonjour"> BONJOUR LE MONDE</div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };