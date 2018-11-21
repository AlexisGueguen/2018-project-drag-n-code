import React from 'react';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import Translation from "../../_constants/en.json"

class ProfileDropdownComponent extends React.Component {
    render() {
        return (
            <div className="dropdown profile-dropdown">
                <div className="user-menu">
                    <Link to="/profile">
                        {(this.props.user.picture) ? (
                            <img className="avatar avatar-picture-default" src={this.props.user.picture} alt="Avatar"/>
                        ) : (
                            <img className="avatar avatar-picture-default" src="/resources/defaultAvatar.jpg" alt="Avatar"/>
                        )}
                    </Link>
                    <ul className="dropdown-menu">
                        <li className="main-items">
                            <Link to="/profile" className="item-link">
                                <span className="glyphicon glyphicon-user"/>
                                <div className="item-title">{this.props.user.username}</div>
                            </Link>

                        </li>
                        <li className="divider"/>
                        <li>
                            <Link to="/leaderboard" className="item-link">
                                <span className="glyphicon glyphicon-globe"/>
                                <div className="item-title">{Translation.header.leaderboardTitle}</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/achievements" className="item-link">
                                <span className="glyphicon glyphicon-certificate"/>
                                <div className="item-title">{Translation.header.achievementsTitle}</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="item-link">
                                <span className="glyphicon glyphicon-cog"/>
                                <div className="item-title">{Translation.header.settingsTitle}</div>
                            </Link>
                        </li>
                        <li className="main-items">
                            <Link to="/login" className="item-link">
                                <span className="glyphicon glyphicon-log-out"/>
                                <div className="item-title">{Translation.header.logoutTitle}</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

const connectedProfileDropdown = connect(mapStateToProps)(ProfileDropdownComponent);
export { connectedProfileDropdown as ProfileDropdownComponent };