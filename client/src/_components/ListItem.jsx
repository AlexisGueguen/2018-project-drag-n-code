import React from "react";
import {history} from "../_helpers";
import {Collapse, Well} from "react-bootstrap";
import {DifficultyStars} from "./DifficultyStars";
import connect from "react-redux/es/connect/connect";

class ListItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handlePlayClick = this.handlePlayClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open});
    }


    handlePlayClick() {
        const { _id } = this.props.value;
        history.push(`/play&id=${_id}`);
    }

    render() {
        const {user, value: level} = this.props;
        let alreadyCompleted = false;
        if (user.levelsCompleted.includes(level._id)) alreadyCompleted = true;
        let liked = false;
        if (user.likes.includes(level._id)) liked = true;
        return (
            <div className="list-item-container container-fluid">
                <div className="list-group-item list-group-item-action list-item-header" onClick={this.handleClick}>
                    {alreadyCompleted && <span className="validation-icon glyphicon glyphicon-ok-circle"/>}
                    <div className="level-header-title">
                        <h4>{level.title}</h4>
                        <p>{level.description}</p>
                    </div>
                    <div className="level-meta-data">
                        {level.isCreatedByCommunity &&
                            <div className="community-votes">
                                <div className={`up-votes-count ${liked && 'liked'}`}>{level.upVotes}</div>
                                <span className={`glyphicon glyphicon-thumbs-up ${liked && 'liked'}`}/>
                            </div>
                        }
                        <DifficultyStars value={level.difficulty}/>
                    </div>
                </div>
                <Collapse in={this.state.open}>
                    <div className="row-fluid">
                        <div className="list-item-details">
                            <Well className="list-item-statement col-md-10 col-sm-9">
                                {level.statement}
                            </Well>
                            <button className="btn circle-button col-md-2 col-sm-3" onClick={this.handlePlayClick}>
                                <span className="glyphicon glyphicon-play"/>
                            </button>
                        </div>
                    </div>
                </Collapse>
            </div>
        );
    };
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

export default connect(mapStateToProps)(ListItem);