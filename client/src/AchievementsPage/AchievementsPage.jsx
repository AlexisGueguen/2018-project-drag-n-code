import React from 'react';
import connect from "react-redux/es/connect/connect";

class AchievementsPage extends React.Component {
    render() {
        return <h2 className="page-title">Achievements</h2>;
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedAchievementsPage = connect(mapStateToProps)(AchievementsPage);
export { connectedAchievementsPage as AchievementsPage };