import React from 'react';

var TeamsComponent = function TeamsComponent(props) {
  var teams = props.teams,
      timestamp = props.timestamp;
  return React.createElement("div", null, "Teams ", timestamp, React.createElement("ul", null, teams && teams.map(function (team, index) {
    return React.createElement("li", {
      key: index
    }, team.TEAM_NAME);
  })));
};

export default TeamsComponent;