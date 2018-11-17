import React from 'react';
import SlideDown from "react-slidedown";

export default class ProfileDropdownComponent extends React.Component {
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
                            <span className="glyphicon glyphicon-user"/>
                            <a href="#">Victor Bonin</a>
                        </li>
                        <li className="divider"></li>
                        <li>
                            <span className="glyphicon glyphicon-globe"/>
                            <a href="#">LeaderBoard</a>
                        </li>
                        <li>
                            <span className="glyphicon glyphicon-certificate"/>
                            <a href="#">Achievements</a>
                        </li>
                        <li>
                            <span className="glyphicon glyphicon-cog"/>
                            <a href="#">Paramètres</a>
                        </li>
                        <li className="main-items">
                            <span className="glyphicon glyphicon-log-out"/>
                            <a href="#">Déconnexion</a>
                        </li>

                    </ul>
            </div>
        )
    }
}