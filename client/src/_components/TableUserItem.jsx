import React from "react";

export class TableUserItem extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.value.score}</th>
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
}