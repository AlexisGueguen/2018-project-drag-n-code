import React from 'react';
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import {HomePage} from "../HomePage";
import {CommunityPage} from "../CommunityPage";
import {LeaderboardPage} from "../LeaderboardPage";
import {ProfilePage} from "../ProfilePage";
import {LevelPage} from "../LevelPage";
import HeaderComponent from "../_components/HeaderComponent";
import Alert from "../_components/Alert";
import {CreateLevelPage} from "../CreateLevelPage";
import {ManageLevelsPage} from "../ManageLevelsPage";
import AchievementsPage from "../AchievementsPage/AchievementsPage";
import AlertAchievement from "../_components/AlertAchievement";

class BasicPage extends React.Component {
    render() {
        return (
            <div className="basic-page">
                <HeaderComponent/>
                <Alert/>
                <AlertAchievement/>
                <Switch>
                    <Route path="/community" component={CommunityPage}/>
                    <Route path="/play&id=:id" component={LevelPage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/leaderboard" component={LeaderboardPage}/>
                    <Route path="/achievements" component={AchievementsPage}/>
                    <Route path="/create-level" component={CreateLevelPage}/>
                    <Route path="/my-levels" component={ManageLevelsPage}/>
                    <Route exact path="/" component={HomePage}/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    };
}

const connectedBasicComponent = connect(mapStateToProps)(BasicPage);
export {connectedBasicComponent as BasicPageComponent};