import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useRef } from 'react';
import TeamsComponent from '../../components/teams';
import SkySportLiveService from '../../services/skysportlive';
import dayjs from 'dayjs';

var getNow = function getNow() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss:SSS');
};

var Teams = function Teams(props) {
  var _props$teams = props.teams,
      initTeams = _props$teams === void 0 ? null : _props$teams,
      query = props.query,
      _props$live = props.live,
      live = _props$live === void 0 ? false : _props$live;
  var subscriptionRef = useRef();

  var _useState = useState(initTeams),
      _useState2 = _slicedToArray(_useState, 2),
      teams = _useState2[0],
      setTeams = _useState2[1];

  var _useState3 = useState(getNow()),
      _useState4 = _slicedToArray(_useState3, 2),
      timestamp = _useState4[0],
      setTimestamp = _useState4[1]; // mount


  useEffect(function () {
    if (!initTeams) {
      console.log('do query');

      var getTeams =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          var teams;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return SkySportLiveService.teamsQuery(query);

                case 2:
                  teams = _context.sent;
                  setTeams(teams);
                  setTimestamp(getNow());

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function getTeams() {
          return _ref.apply(this, arguments);
        };
      }();

      getTeams();
    }
  }, [initTeams, query]);
  useEffect(function () {
    if (live) {
      console.log('do subscription');
      subscriptionRef.current = SkySportLiveService.teamsSubscription(query).subscribe({
        error: function error(_error) {
          console.log('error', _error);
        },
        next: function next(v) {
          setTeams(v.value.data.createTeamSubscription.TEAMS);
          setTimestamp(getNow());
          console.log('data from subscription', v);
        }
      }, []);
      return function () {
        if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
        console.log('unsubscribe');
      };
    }
  }, [live, query]);
  return React.createElement(TeamsComponent, {
    teams: teams,
    timestamp: timestamp
  });
};

export default Teams;