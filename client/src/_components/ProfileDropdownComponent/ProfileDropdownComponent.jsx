import React from 'react';
import connect from "react-redux/es/connect/connect";
import translation from "../../_constants/en";
import {Link} from "react-router-dom";

class ProfileDropdownComponent extends React.Component {
    constructor(props) {
        super(props);
    }

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
                            <a className="item-title" href="#">{this.props.user.username}</a>
                        </Link>

                    </li>
                    <li className="divider"></li>
                    <li>
                        <Link to="/leaderboard" className="item-link">
                            <span className="glyphicon glyphicon-globe"/>
                            <a className="item-title" href="#">LeaderBoard</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/achievements" className="item-link">
                            <span className="glyphicon glyphicon-certificate"/>
                            <a className="item-title" href="#">Achievements</a>
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="item-link">
                            <span className="glyphicon glyphicon-cog"/>
                            <a className="item-title" href="#">Paramètres</a>
                        </Link>
                    </li>
                    <li className="main-items">
                        <Link to="/login" className="item-link">
                            <span className="glyphicon glyphicon-log-out"/>
                            <a className="item-title" href="#">Déconnexion</a>
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