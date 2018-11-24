import React from "react";
import {history} from "../_helpers";
import {Collapse, Well} from "react-bootstrap";
import {DifficultyStars} from "./DifficultyStars";

export class ListItem extends React.Component {
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
        return (
            <div className="list-item-container container-fluid">
                <div className="list-group-item list-group-item-action list-item-header" onClick={this.handleClick}>
                    <div className="level-header-title">
                        <h4>{this.props.value.title}</h4>
                        <p>{this.props.value.description}</p>
                    </div>
                    <div className="level-meta-data">
                        <div className="community-votes">
                            <div className="up-votes-count">{this.props.value.upVotes}</div>
                            <span className="glyphicon glyphicon-thumbs-up"/>
                        </div>
                        <DifficultyStars value={this.props.value.difficulty}/>
                    </div>
                </div>
                <Collapse in={this.state.open}>
                    <div className="row-fluid">
                        <div className="list-item-details">
                            <Well className="list-item-statement col-md-10 col-sm-9">
                                {this.props.value.statement}
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