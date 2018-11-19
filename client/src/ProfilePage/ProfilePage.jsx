import React from 'react';
import connect from "react-redux/es/connect/connect";

class ProfilePage extends React.Component {
    render() {
        return (
            <div className="profile-page">
                <div className=""> </div>
            </div>
            );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { updatedUser, updatingData } = state.updateUser;
    return {
        user,
        updatedUser,
        updatingData
    };
}

export default connect(mapStateToProps)(ProfilePage);