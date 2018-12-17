import React from "react";
import {history} from "../_helpers";
import {alertAchievementActions} from "../_actions";
import connect from "react-redux/es/connect/connect";

class AlertAchievement extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertAchievementActions.clear());
        });

        this.getMessage = this.getMessage.bind(this);
        this.isNewAchievement = this.isNewAchievement.bind(this);
    }

    getMessage() {
        const { numberOfUnlocked, achievement } = this.props;
        return numberOfUnlocked === 1 ? achievement.title : ""+ numberOfUnlocked+" New Achievements Unlocked"
    }

    isNewAchievement() {
        const { numberOfUnlocked } = this.props;
        return numberOfUnlocked > 0;
    }

    render() {
        const { numberOfUnlocked, achievement } = this.props;
        return (
            <div className={"alert-achievement-container " + (numberOfUnlocked ? "" : "empty")}>

                {this.isNewAchievement() &&
                <div className="fixed-alert-achievement">
                    <div className="alert-message">{this.getMessage()}</div>
                    {achievement &&
                    <div className="img-container">
                        <img className="badge-picture" src={`/resources/achievements/${achievement._id}.png`} alt="Badge"/>
                    </div>
                    }
                </div>
                }

                { /**<Modal
                    animationtype={"slide"}
                    backdrop={false}
                    show={this.isNewAchievement()}>
                </Modal> */ }
            </div>
        )}
}

function mapStateToProps(state) {
    const { numberOfUnlocked, achievement } = state.alertAchievements;
    return {
        numberOfUnlocked,
        achievement
    };
}

export default connect(mapStateToProps)(AlertAchievement);