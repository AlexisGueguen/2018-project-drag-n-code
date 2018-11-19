import React from 'react';
import PropTypes from 'prop-types';
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import LoadingPoints from "./LoadingPoints";
import {Collapse, Well} from "react-bootstrap";

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

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div className="list-item-container container-fluid">
                <div className="list-group-item list-group-item-action list-item-header" onClick={this.handleClick}>
                    <h4>{this.props.value.title}</h4>
                    <p>{this.props.value.description}</p>
                </div>
                <Collapse in={this.state.open}>
                    <div className="row-fluid">
                        <div className="list-item-details">
                            <Well className="list-item-statement col-md-10 col-sm-9">
                                {this.props.value.statement}
                            </Well>
                            <button className="btn circle-button col-md-2 col-sm-3">
                                <span className="glyphicon glyphicon-play"/>
                            </button>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    };
}

ListItem.propTypes = {
    levels: PropTypes.object
};
