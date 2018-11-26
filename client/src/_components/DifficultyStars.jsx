import React from 'react';

export class DifficultyStars extends React.Component {
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
            startToPrint.push( <span className="glyphicon glyphicon-star" key={i}/>);
        }
        while(startToPrint.length < 3) {
            startToPrint.push(<span className="glyphicon glyphicon-star-empty" key={startToPrint.length}/>);
        }
        return startToPrint;
    };
}