import React from 'react';
import Translation from '../_constants/en.json'
import ProfileDropdownComponent from "../ProfileDropdownComponent/ProfileDropdownComponent";

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-light header-component">
                    <div className="navbar-title">{Translation.global.title}</div>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <div className="nav-button" href="#">{Translation.homePage.title}
                                <span className="sr-only">(current)</span>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-button" href="#">{Translation.community.title}</div>
                        </li>
                    </ul>
                    <ProfileDropdownComponent/>
                </nav>
            </div>
        )
    }
}