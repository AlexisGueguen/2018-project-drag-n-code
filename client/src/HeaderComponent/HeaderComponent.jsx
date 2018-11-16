import React from 'react';
import connect from "react-redux/es/connect/connect";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../HomePage";
import {CommunityPage} from "../CommunityPage";
import {ProfilePage} from "../ProfilePage";
import {LeaderboardPage} from "../LeaderboardPage";

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className=" navbar navbar-light header-component">
                    <h1>Drag'n Code</h1>
                </nav>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/community" component={CommunityPage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/leaderboard" component={LeaderboardPage}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedHeaderComponent = connect(mapStateToProps)(HeaderComponent);
export { connectedHeaderComponent as HeaderComponent };