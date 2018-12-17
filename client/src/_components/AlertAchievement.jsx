import React from "react";
import connect from "react-redux/es/connect/connect";

class AlertAchievement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfUnlocked: 0,
            achievement: undefined
        };

        this.getMessage = this.getMessage.bind(this);
        this.isNewAchievement = this.isNewAchievement.bind(this);
    }

    getMessage() {
        const {numberOfUnlocked, achievement} = this.state;
        return numberOfUnlocked === 1 ? achievement.title : "" + numberOfUnlocked + " New Achievements Unlocked"
    }

    isNewAchievement() {
        const {numberOfUnlocked} = this.state;
        return numberOfUnlocked > 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.numberOfUnlocked !== this.state.numberOfUnlocked
            && nextProps.numberOfUnlocked > 0
        ) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    numberOfUnlocked: 0
                });
            }, 5000);
        }
        this.setState({
            numberOfUnlocked: nextProps.numberOfUnlocked,
            achievement: nextProps.achievement
        })
    }


    render() {
        const {achievement} = this.state;
        return (
            <div className="alert-achievement-container">

                {this.isNewAchievement() &&
                <div className="fixed-alert-achievement">
                    <div className="alert-message">{this.getMessage()}</div>
                    {achievement &&
                    <div className="img-container">
                        <img className="badge-picture" src={`/resources/achievements/${achievement._id}.png`}
                             alt="Badge"/>
                    </div>
                    }
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {numberOfUnlocked, achievement} = state.alertAchievements;
    return {
        numberOfUnlocked,
        achievement
    };
}

export default connect(mapStateToProps)(AlertAchievement);