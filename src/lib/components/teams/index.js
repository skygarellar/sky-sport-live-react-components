import React from 'react';

const TeamsComponent =  props => {
    const { teams, timestamp } = props;
    return <div>Teams {timestamp}
        <ul>
            {teams && teams.map((team, index) => <li key={index}>{team.TEAM_NAME}</li>)}
        </ul>
        </div>
};

export default TeamsComponent;