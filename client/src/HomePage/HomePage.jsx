import React from 'react';
import LevelList from "../_components/LevelList";
import CreateLevelButtonComponent from "../_components/CreateLevelButtonComponent";

export class HomePage extends React.Component {

    render() {
        return (
            <div className="home-page">
                <LevelList/>
                <CreateLevelButtonComponent/>
            </div>
        );
    }
}