import React from 'react';
import Translation from '../../_constants/en.json'
import {ProfileDropdownComponent} from "../ProfileDropdownComponent/index";
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import _ from "lodash";
import {userActions} from "../../_actions";

class AvatarUploadComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: (this.props.user),
            selectedFile: null
        };

        this.uploadHandler = this.uploadHandler.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    fileChangedHandler = (event) => {
        this.setState({selectedFile: event.target.files[0]})
    };

    uploadHandler = () => {
        let reader  = new FileReader();
        reader.readAsDataURL(this.state.selectedFile);

        let userId = this.state.currentUser._id;
        const { dispatch } = this.props;

        reader.addEventListener("load", function () {
            const uploadUser = {
                _id: userId,
                picture: reader.result
            };
            dispatch(userActions.update(uploadUser));

        }, false);
    };

    render() {
        return (
            <div className="avatar-upload">
                <input type="file" onChange={this.fileChangedHandler}/>
                <button onClick={this.uploadHandler}>Upload!</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user,
    };
}

export default connect(mapStateToProps)(AvatarUploadComponent);