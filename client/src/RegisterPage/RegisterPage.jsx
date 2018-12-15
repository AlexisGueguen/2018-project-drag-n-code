import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import translation from '../_constants/en.json';

import LoadingWheel from '../_components/LoadingPoints';
import {validateEmail} from "../_helpers/utils";
import RCG from 'react-captcha-generator';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                email: '',
            },
            captcha:'',
            submitted: false,
            emailIsValid: true,
            captchaIsValid: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.result = this.result.bind(this)
    }

    result(text) {
        this.setState({
            captcha: text
        })
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        let isEmailValid = validateEmail(user.email);
        this.setState({
            user: {
                ...user,
                [name]: value
            },
            emailIsValid: isEmailValid
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { user, captcha } = this.state;
        const {dispatch} = this.props;

        let isEmailValid = validateEmail(user.email);
        let isCaptchaValid = (captcha === this.captchaEnter.value);

        this.setState({
            submitted: true,
            emailIsValid: isEmailValid,
            captchaIsValid: isCaptchaValid
        });

        if (user.username
            && user.password
            && user.email
            && isEmailValid
            && isCaptchaValid
        ) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted, emailIsValid, captchaIsValid } = this.state;
        return (
            <div className="register-page">
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
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">{translation.register.passwordField}</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                            <div className="help-block">{translation.register.passwordRequired}</div>
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
                        <div className={"form-group captcha-container" + (submitted && !captchaIsValid ? ' has-error' : '')}>
                            <div className="captcha-img">
                                <RCG result={this.result} />
                            </div>
                            <input type='text' className={'form-control'} ref={ref => this.captchaEnter = ref} />
                            {submitted && !captchaIsValid &&
                            <div className="help-block">{translation.register.captchaInvalid}</div>
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