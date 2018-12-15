import React from 'react';
import StarRatingComponent from "react-star-rating-component";

export class DifficultyStars extends React.Component {
    render() {
        return (
            <StarRatingComponent
                name="difficulty"
                starCount={3}
                value={this.props.value}
                editing={false}
                starColor="#FA9539"
            />
        );
    };
}