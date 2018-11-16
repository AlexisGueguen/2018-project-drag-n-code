import React from 'react';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {HeaderComponent} from "../HeaderComponent";
import {Router, Route, Switch} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="page-container">
                {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={HeaderComponent}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route path="/register" component={RegisterPage}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 