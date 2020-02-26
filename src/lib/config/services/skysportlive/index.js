const API_KEY = 'da2-fzhddlo4evgstnxc5b7gykn4r4';

const config = {
    endpoint: 'https://i7frcqxbdzc5lm724itq5fob6q.appsync-api.eu-west-1.amazonaws.com/graphql',
    api_key: API_KEY,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-api-key': API_KEY
    },
    services: {
        teams: {
            query: 'teamList',
            subscription: 'createTeamSubscription',
            select: ['ID', 'TEAM_NAME', 'COMP_ID'],
            variables: [
                {
                    name: 'COMP_ID',
                    param: 'competition', // ?competition=21
                    required: true
                }
            ]   
        },
        ranking: {
            query: 'teamList',
            subscription: 'createTeamSubscription',
            select: ['ID', 'TEAM_NAME', 'COMP_ID'],
            variables: [
                {
                    name: 'COMP_ID',
                    param: 'competition', // ?competition=21
                    required: true
                }
            ]   
        }
    }
    
};

export default config;