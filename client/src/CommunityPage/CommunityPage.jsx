import React from 'react';
import connect from "react-redux/es/connect/connect";

class CommunityPage extends React.Component {
    render() {
        return <h2 className="page-title">Community</h2>;
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedCommunityPage = connect(mapStateToProps)(CommunityPage);
export { connectedCommunityPage as CommunityPage };