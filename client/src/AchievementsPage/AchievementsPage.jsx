import React from 'react';
import connect from "react-redux/es/connect/connect";

class AchievementsPage extends React.Component {
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

const connectedAchievementsPage = connect(mapStateToProps)(AchievementsPage);
export { connectedAchievementsPage as AchievementsPage };