import React from 'react';

export default class LoadingPoints extends React.Component {
    render() {
        return (
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        );
    }
}