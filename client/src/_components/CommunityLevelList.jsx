import React from 'react';
import PropTypes from 'prop-types';
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import LoadingPoints from "./LoadingPoints";
import ListItem from "./ListItem";
import _ from "lodash";
import Translation from "../_constants/en";
import Select from "react-select";

const sortTypeEnum = {
    unsorted: {
        type: 'unsorted',
        order: 'asc',
        name: 'Unsorted'
    },
    popularityAsc: {
        type: 'upVotes',
        order: 'asc',
        name: 'Popularity ↗'
    },
    popularityDesc: {
        type: 'upVotes',
        order: 'desc',
        name: 'Popularity ↘'
    },
    difficultyAsc: {
        type: 'difficulty',
        order: 'asc',
        name: 'Difficulty ↗'
    },
    difficultyDesc: {
        type: 'difficulty',
        order: 'desc',
        name: 'Difficulty ↘'
    }
};

class CommunityLevelList extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            levels: undefined,
            loading: undefined,
            searchText: '',
            sortType: sortTypeEnum.unsorted
        });

        this.props.dispatch(levelActions.getAll(true));

        this.orderLevels = this.orderLevels.bind(this);
        this.hasLevels = this.hasLevels.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    hasLevels() {
        const {levels} = this.state;
        return (!!levels) ? levels.length > 0 : false;
    }

    onSortTypeChange = (selectedOption) => {
        const {levels} = this.state;
        const orderedLevels = this.orderLevels(levels, selectedOption.value);
        this.setState({
            ...this.state,
            levels: orderedLevels,
            sortType: selectedOption.value
        });
        console.log('levels', orderedLevels);
    };

    orderLevels(levels, sortType) {
        console.log('order levels: ', sortType);
        if (sortType) {
            if (sortType === sortTypeEnum.unsorted) {
                const originalLevels = this.props.levels;
                const {searchText} = this.state;
                return this.filterLevels(originalLevels, searchText);
            }
            return _.orderBy(levels, sortType.type, sortType.order);
        }
        return levels;
    }

    filterLevels(levels, text) {
        return levels.filter(lvl => lvl.title.toLowerCase().search(text) !== -1);
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

    onSearchChange(e) {
        const searchText = e.target.value.toLowerCase();
        const {levels} = this.props;
        const filteredLevels = this.filterLevels(levels, searchText);
        const orderedLevels = this.orderLevels(filteredLevels);
        this.setState({
            ...this.state,
            levels: orderedLevels,
            searchText: e.target.value
        });
    }

    render() {
        const { loading, levels, searchText } = this.state;
        return (
            <div className="level-list col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                <div className="user-actions-container">
                    <div className="cntr">
                        <div className="cntr-innr">
                            <label className={searchText ? "non-empty search" : "search"} htmlFor="inpt_search">
                                <input id="inpt_search" type="text" value={searchText} onChange={this.onSearchChange}/>
                            </label>
                        </div>
                    </div>
                    <Select
                        placeholder='Sort by'
                        onChange={this.onSortTypeChange}
                        options={[
                            {value: sortTypeEnum.unsorted, label: sortTypeEnum.unsorted.name},
                            {value: sortTypeEnum.difficultyAsc, label: sortTypeEnum.difficultyAsc.name},
                            {value: sortTypeEnum.difficultyDesc, label: sortTypeEnum.difficultyDesc.name},
                            {value: sortTypeEnum.popularityAsc, label: sortTypeEnum.popularityAsc.name},
                            {value: sortTypeEnum.popularityDesc, label: sortTypeEnum.popularityDesc.name}
                        ]}
                    />
                </div>
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <div className="list-group">
                        {this.hasLevels() ? (
                        levels.map((item) => <ListItem key={item.title} value={item}/>)
                        ) : (
                            <div className="no-item-placeholder">
                                {Translation.community.noLevel}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
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