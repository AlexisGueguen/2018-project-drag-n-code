import React from 'react';
import connect from "react-redux/es/connect/connect";

class LeaderboardPage extends React.Component {
    render() {
        return <h2 className="page-title">Leaderboard</h2>;
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLeaderboardPage = connect(mapStateToProps)(LeaderboardPage);
export { connectedLeaderboardPage as LeaderboardPage };