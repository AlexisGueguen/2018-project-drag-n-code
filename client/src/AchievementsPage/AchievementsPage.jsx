import React from 'react';
import connect from "react-redux/es/connect/connect";
import {achievementActions} from "../_actions";
import LoadingPoints from "../_components/LoadingPoints";

class AchievementsPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(achievementActions.getAll());
        this.isUnlocked = this.isUnlocked.bind(this);
    }

    isUnlocked(achvmt) {
        const { user } = this.props;
        return (user.achievements).includes(achvmt._id);
    }

    render() {
        const { loading, achievements } = this.props;
        return (
            <div className="achievements-page col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <div className="list-group">
                        {achievements &&
                        achievements.map((achievement) =>
                            <div className={"achievement-item" + (this.isUnlocked(achievement) ? " --unlocked":" --locked")}>
                                <div className="list-group-item list-group-item-action list-item-header">
                                    <div className="achievement-header-title">
                                        <h4>{achievement.title}</h4>
                                        <p>{achievement.description}</p>
                                    </div>
                                    {this.isUnlocked(achievement) &&
                                        <img className="badge-picture" src={achievement.badge} alt="Badge"/>
                                    }

                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { loading, achievements } = state.getAllAchievements;
    return {
        user,
        achievements,
        loading
    };
}

export default connect(mapStateToProps)(AchievementsPage);