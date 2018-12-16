import React from 'react';

import {LoginPage} from '../LoginPage';
import {RegisterPage} from '../RegisterPage';
import {BasicPageComponent} from "../BasicPage";
import {Route, Router, Switch} from "react-router-dom";
import {PrivateRoute} from "../_components";
import Alert from "../_components/Alert";
import {history} from "../_helpers";

export class App extends React.Component {
    render() {
        return (
            <div className="page-container">
                <Alert class="fixed-alert"/>
                <Router history={history}>
                    <Switch>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                        <PrivateRoute path="/" component={BasicPageComponent}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}