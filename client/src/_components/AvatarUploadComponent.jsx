import React from 'react';
import Translation from '../_constants/en.json'
import {connect} from "react-redux";
import {userActions} from "../_actions";

class AvatarUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            currentUser: (this.props.user),
            selectedFile: null
        };

        this.uploadHandler = this.uploadHandler.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.openSelector = this.openSelector.bind(this);
    }

    fileChangedHandler = (event) => {
        let reader  = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        const { dispatch } = this.props;
        let currentId = this.state.currentUser._id;

        reader.addEventListener("load", function () {
            const uploadUser = {
                _id: currentId,
                picture: reader.result
            };
            dispatch(userActions.update(uploadUser));
        }, false);
    };

    uploadHandler = () => {
        const { dispatch } = this.props;
        const uploadUser = {
            _id: this.state.currentUser._id,
            picture: this.state.selectedFile
        };
        dispatch(userActions.update(uploadUser));
        this.setState({
            ...this.state,
            selectedFile: null
        })
    };

    render() {
        return (
            <div className="avatar-upload">
                <input className="file-selector" ref={this.myRef} type="file" accept="image/*" capture onChange={this.fileChangedHandler}/>
                {(this.state.selectedFile) ? (
                    <img className="avatar-picture avatar-picture-default" alt="Profile" src={this.state.selectedFile} onClick={this.openSelector}/>
                ) : ((this.props.user.picture) ? (
                        <img className="avatar-picture avatar-picture-default" alt="Profile" src={this.props.user.picture} onClick={this.openSelector}/>
                    ) : (
                        <img className="avatar-picture avatar-picture-default" alt="Profile" src="/resources/defaultAvatar.jpg" onClick={this.openSelector}/>
                    )
                )}
                {(this.state.selectedFile) &&
                <button className="btn btn-primary" onClick={this.uploadHandler}>{Translation.profile.uploadPictureButton}</button>
                }
            </div>
        );
    }

    openSelector() {
        const node = this.myRef.current;
        node.click();
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user,
    };
}

export default connect(mapStateToProps)(AvatarUploadComponent);