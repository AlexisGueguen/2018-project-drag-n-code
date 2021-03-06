import React from 'react';
import connect from "react-redux/es/connect/connect";
import {levelActions} from "../_actions";
import LoadingPoints from "../_components/LoadingPoints";
import PropTypes from "prop-types";
import {DifficultyStars} from "../_components/DifficultyStars";
import Translation from "../_constants/en.json"
import {Button, Modal} from "react-bootstrap";
import CreateLevelButtonComponent from "../_components/CreateLevelButtonComponent";

class ManageLevelsPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.hasLevels = this.hasLevels.bind(this);
        this.props.dispatch(levelActions.getByAuthorId(this.props.user._id));
    }

    handleDelete() {
        const {dispatch} = this.props;
        const {levelToDelete} = this.state;
        dispatch(levelActions.deleteById(levelToDelete._id, this.props.user._id));

        this.setState({ show: false });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(levelToDelete) {
        this.setState({
            show: true,
            levelToDelete : levelToDelete
        });
    }

    hasLevels() {
        const {levels} = this.props;
        return (!!levels) ? levels.length > 0 : false;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.levels !== nextProps.levels) {
            this.setState({
                levels: nextProps.levels,
            });
        }
        return null
    }

    render() {
        const { loading, levels, user } = this.props;
        return (
            <div className="my-levels-page">
                <div className="level-list col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                    {loading ? (
                        <LoadingPoints/>
                    ) : (
                        <div className="list-group">
                            {this.hasLevels() ? (
                            levels.map((item) => {
                                let liked = false;
                                if (user.likes.includes(item._id)) liked = true;
                                return <div key={item._id} className="list-item-container container-fluid">
                                    <div className="list-group-item list-group-item-action list-item-header" >
                                        <div className="level-header-title">
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                            <div className="level-meta-data">
                                                <div className="community-votes">
                                                    <div className={`up-votes-count ${liked && 'liked'}`}>{item.upVotes}</div>
                                                    <span className={`glyphicon glyphicon-thumbs-up ${liked && 'liked'}`}/>
                                                </div>
                                                <DifficultyStars value={item.difficulty}/>
                                            </div>
                                        </div>
                                        <div className="trash-button">
                                            <span className="glyphicon glyphicon-trash" onClick={() => {this.handleShow(item)}}/>
                                        </div>
                                    </div>
                                </div>})
                                ) : (
                                <div className="no-item-placeholder">
                                    {Translation.manageLevels.noLevels}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{Translation.manageLevels.deleteMessageTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            {Translation.manageLevels.deleteMessageBody}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>{Translation.manageLevels.cancelButton}</Button>
                        <Button bsStyle="primary" onClick={this.handleDelete}>{Translation.manageLevels.deleteButton}</Button>
                    </Modal.Footer>
                </Modal>

                <CreateLevelButtonComponent/>
            </div>
        );
    }
}

ManageLevelsPage.propTypes = {
    loading: PropTypes.bool,
    levels: PropTypes.array
};

function mapStateToProps(state) {
    const { user } = state.authentication;
    const { loading, levels } = state.getAllLevelsByUser;
    return {
        user,
        loading,
        levels
    };
}

const connectedManageLevelsPage = connect(mapStateToProps)(ManageLevelsPage);
export { connectedManageLevelsPage as ManageLevelsPage };