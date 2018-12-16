import React from 'react';
import Translation from '../_constants/en.json'
import {Link} from "react-router-dom";
import ProfileDropdownComponent from "./ProfileDropdownComponent";

export default class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.logo = React.createRef();
        this.clickLogo = this.clickLogo.bind(this);
    }

    clickLogo() {
        this.logo.current.click();
    }

    render() {
        return (
            <div className="header">
                <nav className="navbar navbar-light header-component">
                    <Link to="/">
                        <img className="navbar-logo" src="/resources/logo.png" alt="logo" ref={this.logo}/>
                    </Link>
                        <div className="navbar-title" onClick={this.clickLogo}>{Translation.global.title}</div>
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