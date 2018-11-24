import React from 'react';
import PropTypes from 'prop-types';
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import LoadingPoints from "./LoadingPoints";
import {Collapse, Well} from "react-bootstrap";
import { history } from '../_helpers';
import {ListItem} from "./ListItem";

class LevelList extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(levelActions.getAll());
    }

    render() {
        const { loading, levels } = this.props;
        return (
            <div className="level-list col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
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
