import React from 'react';
import connect from "react-redux/es/connect/connect";
import translation from '../_constants/en.json';
import {userActions} from "../_actions";
import _ from 'lodash';
import AvatarUploadComponent from "../_components/AvatarUploadComponent";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            user: _.clone(this.props.user)
        };

        this.onEditProfile = this.onEditProfile.bind(this);
        this.onSaveProfile = this.onSaveProfile.bind(this);
        this.onCancelChanges = this.onCancelChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onEditProfile() {
        this.setState({ isEditing: true });
    }

    onSaveProfile() {
        //e.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.update(user));

        this.setState({ isEditing: false });
    }

    onCancelChanges() {
        this.setState({ isEditing: false });
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { user } = {...this.state};
        this.setState(() => {
            user[name] = value;
            return user;
        });
    }

    render() {
        const { isEditing } = this.state;
        const { user } = this.state;
        if(!isEditing) {
            return (
                <div className="profile-page">
                    <div className="profile-container">
                        <div className="profile-data-container">
                            <h2 className="page-title">{translation.profile.title}</h2>
                            <div className="username-container data-container">
                                <div className="data-title">{translation.profile.usernameTitle}</div>
                                <div className="">{this.props.user.username}</div>
                            </div>
                            <div className="email-container data-container">
                                <div className="data-title">{translation.profile.emailTitle}</div>
                                <div type="mail" className="">{this.props.user.email}</div>
                            </div>
                        </div>
                        <AvatarUploadComponent/>
                    </div>
                    <div className="action-buttons">
                        <button type="button" className="btn btn-primary"
                                onClick={this.onEditProfile}>{translation.profile.modifyButton}</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="profile-page">
                    <div className="profile-data-container">
                        <h3>{translation.profile.title}</h3>
                        <div className="username-container data-container">
                            <label className="data-title">{translation.profile.usernameTitle}</label>
                            <input className="form-control" value={user.username} name="username" onChange={this.handleChange}/>
                        </div>
                        <div className="flex-container">
                            <div className="email-container data-container">
                                <label className="data-title">{translation.profile.emailTitle}</label>
                                <input className="form-control" value={user.email}
                                       name="email" onChange={this.handleChange}
                                       placeholder={translation.profile.emailPlaceholder}/>
                            </div>
                            <small className="form-text text-muted">
                                {translation.profile.emailTip}
                            </small>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button type="button" className="btn btn-primary"
                                onClick={this.onCancelChanges}>{translation.profile.cancelButton}</button>
                        <button type="button" className="btn btn-primary"
                                onClick={this.onSaveProfile}>{translation.profile.saveButton}</button>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { updatedUser, updatingData } = state.updateUser;
    return {
        user,
        updatedUser,
        updatingData
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage};