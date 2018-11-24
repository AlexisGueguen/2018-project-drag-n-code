import React from 'react';

export class DifficultyStars extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="difficulty-stars">
                {this.getStarsToPrint()}
            </div>

        );
    };

    getStarsToPrint() {
        let startToPrint = [];
        for (let i = 0; i < this.props.value; i++) {
            startToPrint.push( <span className="glyphicon glyphicon-star"/>);
        }
        while(startToPrint.length < 3) {
            startToPrint.push(<span className="glyphicon glyphicon-star-empty"/>);
        }
        return startToPrint;
    };
}