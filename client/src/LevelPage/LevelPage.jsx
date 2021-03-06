import React from "react";
import {levelActions} from "../_actions/level.actions";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import LoadingPoints from "../_components/LoadingPoints";
import StatementPanel from "./StatementPanel";
import {SubmissionPanel} from "./SubmissionPanel";
import {Col, Grid, Row} from "react-bootstrap";
import {GeneratedCodePanel} from './GeneratedCodePanel';
import {Playground} from "./Playground/Playground";

class LevelPage extends React.Component {
    constructor(props) {
        super(props);
        let id = this.props.match.params.id;
        this.props.dispatch(levelActions.getById(id));
    }

    render() {
        const { loading, level } = this.props;
        return (
            <Grid fluid={true} className="level-page">
                {loading ? (
                    <LoadingPoints/>
                ) : (
                    level &&
                    <Row className="level-page-row">
                        <Playground/>
                        <Col sm={5} md={5} className="scrolling-panel dark-area">
                            <StatementPanel value={level.statement} title={level.title}/>
                            <GeneratedCodePanel/>
                        </Col>
                        <SubmissionPanel/>
                    </Row>
                )}
            </Grid>
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

const connectedLevelPage = connect(mapStateToProps)(LevelPage);
export {connectedLevelPage as LevelPage};
