import React from 'react';
import Translation from "../_constants/en";
import {Link} from "react-router-dom";

export default class CreateLevelButtonComponent extends React.Component {
    render() {
        return (
            <Link to="/create-level" className="nav-button" href="#">
                <button className="btn circle-button create-level-button">
                    <span className="glyphicon glyphicon-plus"/>
                </button>
            </Link>
        )
    }
}