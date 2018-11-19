import React from 'react';
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class ProfileDropdownComponent extends React.Component {

    render() {
        return (
            <div className="dropdown profile-dropdown">
                <div className="user-profile">
                    <img src="/resources/defaultAvatar.jpg" alt="Avatar" className="avatar"/>
                </div>
                <ul className="dropdown-menu">
                    <li className="main-items">
                        <Link to="/profile" className="item-link">
                            <span className="glyphicon glyphicon-user"/>
                            <div className="item-title" href="#">{this.props.user.username}</div>
                        </Link>

                    </li>
                    <li className="divider"></li>
                    <li>
                        <Link to="/leaderboard" className="item-link">
                            <span className="glyphicon glyphicon-globe"/>
                            <div className="item-title" href="#">LeaderBoard</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/achievements" className="item-link">
                            <span className="glyphicon glyphicon-certificate"/>
                            <div className="item-title" href="#">Achievements</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="item-link">
                            <span className="glyphicon glyphicon-cog"/>
                            <div className="item-title" href="#">Paramètres</div>
                        </Link>
                    </li>
                    <li className="main-items">
                        <Link to="/login" className="item-link">
                            <span className="glyphicon glyphicon-log-out"/>
                            <div className="item-title" href="#">Déconnexion</div>
                        </Link>
                    </li>
                </ul>
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