import React from 'react';
import connect from "react-redux/es/connect/connect";
import {userActions} from "../_actions";
import LoadingPoints from "../_components/LoadingPoints";
import {TableUserItem} from "../_components/TableUserItem";

class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);

        // load fiest 20 users
        this.props.dispatch(userActions.getByScore(20));

        this.state = {
            loading: '',
            topUsers: '',
            user: this.props.user
        };
    }

    render() {
        const { topUsers, loading, user } = this.state;
        return (
            <div className="leaderboard-page">
                <h2 className="page-title">Leaderboard</h2>;
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col"/>
                                <th scope="col">Username</th>
                                <th scope="col">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topUsers &&
                                topUsers.map((user) => <TableUserItem key={user.username} value={user}/>)
                            }
                        </tbody>
                    </table>
                )}
            </div>
        )
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