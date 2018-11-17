import React from 'react';
import PropTypes from 'prop-types';
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import LoadingPoints from "./LoadingPoints";

class LevelList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(levelActions.getAll());
    }

    render() {
        const { loading, levels } = this.props;
        console.log(levels);
        return (
            <div className='level-list'>
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <ul>{levels ? levels.map((item) => <li>{item.title} - {item.description}</li>) : <p>No levels found...</p>}</ul>
                )}
            </div>
        );
    }
}

LevelList.propTypes = {
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

export default connect(mapStateToProps)(LevelList);
