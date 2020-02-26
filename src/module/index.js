import React from 'react';
import { Teams } from '../lib';

const teams = [{
    POS: 1,
    TEAM_NAME: 'Juventus'
},
{
    POS: 2,
    TEAM_NAME: 'Inter'
},
{
    POS: 3,
    TEAM_NAME: 'Udinese'
}]

const App = () => <Teams live teams={teams} query={{competition: 21}} />;

export default App;