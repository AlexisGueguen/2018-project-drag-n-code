import React from 'react';
import connect from "react-redux/es/connect/connect";

class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
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