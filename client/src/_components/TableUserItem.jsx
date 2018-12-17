import React from "react";
import connect from "react-redux/es/connect/connect";
import _ from "lodash";

class TableUserItem extends React.Component {
    constructor(props) {
        super(props);

        this.getPosition = this.getPosition.bind(this);
        this.isUser = this.isUser.bind(this);
    }

    render() {
        return (
            <tr className={this.isUser() ? "user-row":""}>
                <th scope="row">{this.getPosition()}</th>
                <td className="avatar-container">
                    {(this.props.value.picture) ? (
                        <img className="avatar avatar-picture-default" src={this.props.value.picture} alt="Avatar"/>
                    ) : (
                        <img className="avatar avatar-picture-default" src="/resources/defaultAvatar.jpg" alt="Avatar"/>
                    )}
                </td>
                <td>{this.props.value.username}</td>
                <td>{this.props.value.score}</td>
            </tr>
        )
    }

    getPosition() {
        const { topUsers, value } = this.props;

        return (_.findIndex(topUsers, (user) => {
            return user.username === value.username
        }))+1
    }

    isUser(){
        const { user } = this.props;
        return user._id === this.props.value._id;
    }
}

function mapStateToProps(state) {
    const { topUsers } = state.getTopUsers;
    const { user } = state.authentication;
    return {
        topUsers,
        user
    };
}

const connectedTableUserItem = connect(mapStateToProps)(TableUserItem);
export { connectedTableUserItem as TableUserItem };