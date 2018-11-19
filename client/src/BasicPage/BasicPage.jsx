import React from 'react';
import connect from "react-redux/es/connect/connect";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../HomePage";
import {CommunityPage} from "../CommunityPage";
import {LeaderboardPage} from "../LeaderboardPage";
import HeaderComponent from "../_components/HeaderComponent/HeaderComponent";
import {AchievementsPage} from "../AchievementsPage";
import {SettingsPage} from "../SettingsPage";
import ProfilePage from "../ProfilePage/ProfilePage";

class BasicPage extends React.Component {

    render() {
        return (
            <div className="basic-page">
                <HeaderComponent/>
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route path="/community" component={CommunityPage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/leaderboard" component={LeaderboardPage}/>
                    <Route path="/settings" component={SettingsPage}/>
                    <Route path="/achievements" component={AchievementsPage}/>
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

const connectedBasicComponent = connect(mapStateToProps)(BasicPage);
export { connectedBasicComponent as BasicPageComponent };