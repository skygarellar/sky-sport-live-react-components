import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from '../../config/services/skysportlive';

const createTeamSubscription = `subscription onCreateTeamSubscription ($COMP_ID: Int!) {

    createTeamSubscription(COMP_ID: $COMP_ID) {
        COMP_ID,
        TEAMS {
          ID
          TEAM_NAME
        }
      }
  }`;

const {
    endpoint,
    api_key,
    headers,
    services
} = config;

Amplify.configure({
    aws_appsync_graphqlEndpoint: endpoint,
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: api_key,
    API: {
        graphql_endpoint: endpoint,
        graphql_headers: async () => headers
    }
});

const queryBuilder = (name, variables, select) => {
    const vars = Object.keys(variables).map(name => `${name}: ${variables[name]}`).join(', ');
    return `query {
        ${name} (${vars}) {
            ${select.join(', ')}
        }
    }`;
};

const subscriptionBuilder = (name, variables, select) => {
    const vars = Object.keys(variables).map(name => `$${name}: ${variables[name]}`).join(', ');
    return `subscription {
        ${name} (${vars}) {
            ${select.join(', ')}
        }
    }`;
}

const doQuery = (query) => API.graphql(graphqlOperation(query));

const doSubscription = subscription => API.graphql(graphqlOperation(createTeamSubscription, { COMP_ID: 21 }));

const query = async (serviceConfig, params) => {
    const { query, variables, select } = serviceConfig;
    const vars = getVars(variables, params);
    console.log(queryBuilder(query, vars, select));
    const response = await doQuery(queryBuilder(query, vars, select));
    return response.data[query];
};

const subscription = (serviceConfig, params) => {
    const { subscription, variables, select } = serviceConfig;
    const vars = getVars(variables, params);
    return doSubscription(subscriptionBuilder(subscription, vars, select));
};

const getVars = (variables, params) => {
    const allRequiredPresent = variables.filter(variable => variable.required).every(variable => (variable.param ? variable.param : variable.name) in params);
    if (allRequiredPresent) {
        return variables.reduce((queryParams, variable) => {
            queryParams[variable.name] = params[variable.param ? variable.param : variable.name];
            return queryParams;
        }, {});
    }
    else {
        throw new Error('Missing required params');
    }
}

const SkySportLiveService = {

    rankingQuery: (params) => {
        try {
            const { ranking: rankingConfig } = services;
            return query(rankingConfig, params);
        } catch (error) {
            throw new Error(`rankingQuery :: ${error.message}`);
        }
    },

    rankingSubscription: (params) => {
        try {
            const { ranking: rankingConfig } = services;
            return subscription(rankingConfig, params);
        } catch (error) {
            throw new Error(`rankingSubscription :: ${error}`);
        }
    },
    teamsQuery: (params) => {
        try {
            const { teams: teamsConfig } = services;
            return query(teamsConfig, params);
        } catch (error) {
            throw new Error(`teamsQuery :: ${error.message}`);
        }
    },

    teamsSubscription: (params) => {
        try {
            const { teams: teamsConfig } = services;
            return subscription(teamsConfig, params);
        } catch (error) {
            throw new Error(`teamsSubscription :: ${error}`);
        }
    }
};

export default SkySportLiveService;