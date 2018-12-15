import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import translation from '../_constants/en.json';

import LoadingWheel from '../_components/LoadingPoints';
import {isStrongPassword, validateEmail} from "../_helpers/utils";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                email: ''
            },
            submitted: false,
            emailIsValid: true,
            passwordValid: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        console.log(event.target.value);
        const { name, value } = event.target;
        const { user } = this.state;
        let isEmailValid = ((name === 'email') ? validateEmail(value) : this.state.emailIsValid);
        let isPasswordValid = ((name === 'password') ? isStrongPassword(value) : this.state.passwordValid);
        this.setState({
            user: {
                ...user,
                [name]: value
            },
            emailIsValid: isEmailValid,
            passwordValid: isPasswordValid
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user } = this.state;
        let isEmailValid = validateEmail(user.email);
        let isPasswordValid = isStrongPassword(user.password);
        this.setState({
            submitted: true,
            emailIsValid: isEmailValid,
            passwordValid: isPasswordValid
        });
        const {dispatch} = this.props;
        if (user.username
            && user.password
            && user.email
            && validateEmail(user.email)
            && isStrongPassword(user.password)
        ) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, emailIsValid, passwordValid } = this.state;
        return (
            <div className="col-md-2 col-md-offset-5 col-sm-4 col-sm-offset-4 login-container">
                <h2>{translation.register.title}</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">{translation.register.usernameField}</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">{translation.register.usernameRequired}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!user.password || !passwordValid) ? ' has-error' : '')}>
                        <label htmlFor="password">{translation.register.passwordField}</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">{translation.register.passwordRequired}</div>
                        }
                        {submitted && user.password && !passwordValid &&
                            <div className="help-block">{translation.register.strongPasswordRequired}</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && (!user.email || !emailIsValid) ? ' has-error' : '')}>
                        <label htmlFor="mail">{translation.register.emailField}</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">{translation.register.emailRequired}</div>
                        }
                        {submitted && user.email && !emailIsValid &&
                            <div className="help-block">{translation.register.emailInvalid}</div>
                        }
                    </div>
                    <div className="form-group">
                        {registering ? (
                            <LoadingWheel/>
                        ) :(
                            <div className="form-actions">
                                <button className="btn btn-primary col-md-6 col-sm-6">{translation.register.title}</button>
                                <Link to="/login" className="btn btn-link col-md-6 col-sm-6">{translation.register.cancelLink}</Link>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };