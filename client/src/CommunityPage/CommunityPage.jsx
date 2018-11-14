import React from 'react';
import connect from "react-redux/es/connect/connect";

class CommunityPage extends React.Component {
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

const connectedCommunityPage = connect(mapStateToProps)(CommunityPage);
export { connectedCommunityPage as CommunityPage };