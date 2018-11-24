import React from 'react';
import CreateLevelButtonComponent from "../_components/CreateLevelButtonComponent";
import CommunityLevelList from "../_components/CommunityLevelList";

export class CommunityPage extends React.Component {
    render() {
        return (
            <div className="community-page">
                <CommunityLevelList/>
                <CreateLevelButtonComponent/>
            </div>
        );
    }
}