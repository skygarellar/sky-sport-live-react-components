import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from '../../config/services/skysportlive';
var createTeamSubscription = "subscription onCreateTeamSubscription ($COMP_ID: Int!) {\n\n    createTeamSubscription(COMP_ID: $COMP_ID) {\n        COMP_ID,\n        TEAMS {\n          ID\n          TEAM_NAME\n        }\n      }\n  }";
var endpoint = config.endpoint,
    api_key = config.api_key,
    headers = config.headers,
    services = config.services;
Amplify.configure({
  aws_appsync_graphqlEndpoint: endpoint,
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: api_key,
  API: {
    graphql_endpoint: endpoint,
    graphql_headers: function () {
      var _graphql_headers = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", headers);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function graphql_headers() {
        return _graphql_headers.apply(this, arguments);
      }

      return graphql_headers;
    }()
  }
});

var queryBuilder = function queryBuilder(name, variables, select) {
  var vars = Object.keys(variables).map(function (name) {
    return "".concat(name, ": ").concat(variables[name]);
  }).join(', ');
  return "query {\n        ".concat(name, " (").concat(vars, ") {\n            ").concat(select.join(', '), "\n        }\n    }");
};

var subscriptionBuilder = function subscriptionBuilder(name, variables, select) {
  var vars = Object.keys(variables).map(function (name) {
    return "$".concat(name, ": ").concat(variables[name]);
  }).join(', ');
  return "subscription {\n        ".concat(name, " (").concat(vars, ") {\n            ").concat(select.join(', '), "\n        }\n    }");
};

var doQuery = function doQuery(query) {
  return API.graphql(graphqlOperation(query));
};

var doSubscription = function doSubscription(subscription) {
  return API.graphql(graphqlOperation(createTeamSubscription, {
    COMP_ID: 21
  }));
};

var query =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(serviceConfig, params) {
    var query, variables, select, vars, response;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = serviceConfig.query, variables = serviceConfig.variables, select = serviceConfig.select;
            vars = getVars(variables, params);
            console.log(queryBuilder(query, vars, select));
            _context2.next = 5;
            return doQuery(queryBuilder(query, vars, select));

          case 5:
            response = _context2.sent;
            return _context2.abrupt("return", response.data[query]);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function query(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var subscription = function subscription(serviceConfig, params) {
  var subscription = serviceConfig.subscription,
      variables = serviceConfig.variables,
      select = serviceConfig.select;
  var vars = getVars(variables, params);
  return doSubscription(subscriptionBuilder(subscription, vars, select));
};

var getVars = function getVars(variables, params) {
  var allRequiredPresent = variables.filter(function (variable) {
    return variable.required;
  }).every(function (variable) {
    return (variable.param ? variable.param : variable.name) in params;
  });

  if (allRequiredPresent) {
    return variables.reduce(function (queryParams, variable) {
      queryParams[variable.name] = params[variable.param ? variable.param : variable.name];
      return queryParams;
    }, {});
  } else {
    throw new Error('Missing required params');
  }
};

var SkySportLiveService = {
  rankingQuery: function rankingQuery(params) {
    try {
      var rankingConfig = services.ranking;
      return query(rankingConfig, params);
    } catch (error) {
      throw new Error("rankingQuery :: ".concat(error.message));
    }
  },
  rankingSubscription: function rankingSubscription(params) {
    try {
      var rankingConfig = services.ranking;
      return subscription(rankingConfig, params);
    } catch (error) {
      throw new Error("rankingSubscription :: ".concat(error));
    }
  },
  teamsQuery: function teamsQuery(params) {
    try {
      var teamsConfig = services.teams;
      return query(teamsConfig, params);
    } catch (error) {
      throw new Error("teamsQuery :: ".concat(error.message));
    }
  },
  teamsSubscription: function teamsSubscription(params) {
    try {
      var teamsConfig = services.teams;
      return subscription(teamsConfig, params);
    } catch (error) {
      throw new Error("teamsSubscription :: ".concat(error));
    }
  }
};
export default SkySportLiveService;