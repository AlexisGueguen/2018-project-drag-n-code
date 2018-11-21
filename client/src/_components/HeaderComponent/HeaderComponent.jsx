import React from 'react';
import Translation from '../../_constants/en.json'
import {ProfileDropdownComponent} from "../ProfileDropdownComponent/index";
import {Link} from "react-router-dom";

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-light header-component">
                    <div className="navbar-title">{Translation.global.title}</div>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-button" href="#">{Translation.homePage.title}
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/community" className="nav-button" href="#">{Translation.community.title}</Link>
                        </li>
                    </ul>
                    <ProfileDropdownComponent/>
                </nav>
            </div>
        )
    }
}