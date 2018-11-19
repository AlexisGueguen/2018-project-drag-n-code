import React from 'react';
import { connect } from 'react-redux';
import LevelList from "../_components/LevelList";

class HomePage extends React.Component {

    render() {
        return (
            <div className="home-page">
                <LevelList/>
                <button className="btn create-level-button">
                    <span className="glyphicon glyphicon-plus"/>
                </button>
            </div>
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