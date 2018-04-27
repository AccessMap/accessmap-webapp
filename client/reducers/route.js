import { combineReducers } from 'redux';

import {
  FAILED_ROUTE,
  RECEIVE_ROUTE,
  REQUEST_ROUTE,
  TOGGLE_TRIP_PLANNING,
} from 'actions';

import { defaultRoute as defaults } from './defaults';

const handleRoute = (state = defaults.routeResult, action) => {
  switch (action.type) {
    case TOGGLE_TRIP_PLANNING:
      return action.payload.planningTrip ? null : state;
    case RECEIVE_ROUTE:
      return action.payload.routeResult;
    default:
      return state;
  }
};

const handleFetchingRoute = (state = defaults.fetchingRoute, action) => {
  switch (action.type) {
    case REQUEST_ROUTE:
      return true;
    case RECEIVE_ROUTE:
    case FAILED_ROUTE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  fetchingRoute: handleFetchingRoute,
  routeResult: handleRoute,
});
