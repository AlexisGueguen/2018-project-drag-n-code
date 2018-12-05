import React from 'react';
import PropTypes from 'prop-types';
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import LoadingPoints from "./LoadingPoints";
import {ListItem} from "./ListItem";
import _ from "lodash";
import {DropdownButton, MenuItem} from "react-bootstrap";

class CommunityLevelList extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            levels: undefined,
            loading: undefined,
            sortText: { currentTarget:
                        {
                            text: "Popularity desc"
                        }
                    },
            sortKey: "upVotes desc"
        });

        this.props.dispatch(levelActions.getAll(true));


        this.handleSearch = this.handleSearch.bind(this);
        this.orderLevels = this.orderLevels.bind(this);
    }

    render() {
        const { loading, levels, sortText } = this.state;
        return (
            <div className="level-list col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                <div className="user-actions-container">
                    <div className="search-box">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleSearch}/>
                    </div>
                    <DropdownButton onSelect={this.orderLevels} title={sortText.currentTarget.text}
                                    id={`split-button-basic-$1`} key="1">
                        <MenuItem eventKey="difficulty asc">Difficulty asc</MenuItem>
                        <MenuItem eventKey="difficulty desc">Difficulty desc</MenuItem>
                        <MenuItem eventKey="upVotes asc">Popularity asc</MenuItem>
                        <MenuItem eventKey="upVotes desc">Popularity desc</MenuItem>
                    </DropdownButton>
                </div>
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <div className="list-group">
                        {levels != null && levels !== undefined &&
                        levels.map((item) => <ListItem key={item.title} value={item}/>)
                        }
                    </div>
                )}
            </div>
        );
    }

    handleSearch(event) {
        let filteredLevels = _.clone(this.props.levels);
        filteredLevels = filteredLevels.filter(function(lvl){
            let found = lvl.title.toLowerCase().search(event.target.value.toLowerCase());
            return found!== -1;
        });
        this.setState({
            levels: filteredLevels
        }, () => {
            this.orderLevels(this.state.sortKey, this.state.sortText)
        });
    }

    orderLevels(eventKey, event) {
        let orderedLevels = this.state.levels;
        let orderParameters = eventKey.split(' ', 2);
        orderedLevels = _.orderBy(orderedLevels, orderParameters[0], orderParameters[1]);

        let myEvent = {
            currentTarget : {
                text : event.currentTarget.text
            }
        };

        this.setState({
            levels : orderedLevels,
            sortText : myEvent,
            sortKey : eventKey
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.levels !== nextProps.levels) {
            this.setState({
                levels: nextProps.levels,
                loading: nextProps.loading,
            }, () => {
                this.orderLevels(this.state.sortKey, this.state.sortText);
            });
        }
        return null
    }
}

CommunityLevelList.propTypes = {
    loading: PropTypes.bool,
    levels: PropTypes.array
};

function mapStateToProps(state) {
    const { loading, levels } = state.getAllLevels;
    return {
        loading,
        levels
    };
}

export default connect(mapStateToProps)(CommunityLevelList);