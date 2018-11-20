import React from "react";
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import LoadingPoints from "../_components/LoadingPoints";

class LevelPage extends React.Component {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        console.log(id);
        this.props.dispatch(levelActions.getById(id));
    }

    render() {
        const { loading, level } = this.props;
        return (
            <div className="level-page">
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    <div>
                        {level != null && level !== undefined && level.title}
                    </div>
                )}
            </div>
        );
    }

}

LevelPage.propTypes = {
    loading: PropTypes.bool,
    level: PropTypes.object
};

function mapStateToProps(state) {
    const { loading, level } = state.getLevel;
    return {
        loading,
        level
    };
}

export default connect(mapStateToProps)(LevelPage);
