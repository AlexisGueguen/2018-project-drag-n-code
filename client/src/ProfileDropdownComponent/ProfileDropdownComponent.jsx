import React from 'react';

export default class ProfileDropdownComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-dropdown">
                    <div className="user-profile">
                        <img src="../../public/resources/defaultAvatar.png" alt="Avatar" className="avatar"/>
                    </div>
            </div>
        )
    }
}