import React from 'react';

import { history } from '../_helpers';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {BasicPageComponent} from "../BasicPage";
import {Router, Route, Switch} from "react-router-dom";
import {PrivateRoute} from "../_components";
import Alert from "../_components/Alert";
import ThemeLoader from 'react-theme-loader'

export class App extends React.Component {
    render() {
        let supportedThemes = ['light', 'dark'];
        return (
            <div className="page-container">
                <ThemeLoader
                    ref='themeLoader'
                    supportedThemes={supportedThemes}/>
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