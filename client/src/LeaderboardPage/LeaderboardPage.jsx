import React from 'react';
import connect from "react-redux/es/connect/connect";
import {userActions} from "../_actions";
import LoadingPoints from "../_components/LoadingPoints";
import {TableUserItem} from "../_components/TableUserItem";
import Translation from "../_constants/en";
import _ from 'lodash';

class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);

        // load first 20 users
        this.props.dispatch(userActions.getByScore(20));

        this.state = {
            loading: '',
            topUsers: '',
            user: this.props.user,
        };
    }

    render() {
        const { topUsers, loading, user } = this.state;
        return (
            <div className="leaderboard-page">
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <div>
                        <table className="table table-striped">
                            <thead className="thead-primary">
                            <tr>
                                <th className="rank-field" scope="col">{Translation.leaderboard.rankHeader}</th>
                                <th className="avatar-container" scope="col"/>
                                <th className="name-field" scope="col">{Translation.leaderboard.nameHeader}</th>
                                <th className="score-field" scope="col">{Translation.leaderboard.scoreHeader}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topUsers &&
                                topUsers.map((user) => <TableUserItem key={user.username} value={user}/>)
                            }
                            </tbody>
                        </table>
                        {!this.isUserTop20() &&
                            <div>
                                <div className="vertical-dots"/>
                                <table className="table table-striped">
                                    <tbody>
                                    <tr className="user-row">
                                        <th className="rank-field" scope="row"/>
                                        <td className="avatar-container">
                                            {(user.picture) ? (
                                                <img className="avatar avatar-picture-default" src={user.picture} alt="Avatar"/>
                                            ) : (
                                                <img className="avatar avatar-picture-default" src="/resources/defaultAvatar.jpg" alt="Avatar"/>
                                            )}
                                        </td>
                                        <td className="name-field">{user.username}</td>
                                        <td className="score-field">{user.score}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                )}
            </div>
        )
    }


    isUserTop20() {
        const { topUsers, user} = this.state;
        return _.find(topUsers, {_id: user._id});
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.topUsers !== nextProps.topUsers) {
            this.setState({
                topUsers: nextProps.topUsers,
                loading: nextProps.loading,
            });
        }
        return null
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { topUsers , loading } = state.getTopUsers;
    return {
        user,
        topUsers,
        loading
    };
}

const connectedLeaderboardPage = connect(mapStateToProps)(LeaderboardPage);
export { connectedLeaderboardPage as LeaderboardPage };