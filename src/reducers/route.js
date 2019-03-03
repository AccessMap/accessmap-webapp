import { combineReducers } from "redux";
import { actionTypes as router5Types } from "redux-router5";

import { FAILED_ROUTE, RECEIVE_ROUTE, REQUEST_ROUTE } from "actions";

import { defaultRoute as defaults } from "./defaults";

const handleRoute = (state = defaults.routeResult, action) => {
  switch (action.type) {
    case RECEIVE_ROUTE:
      return action.payload.routeResult;
    case router5Types.TRANSITION_SUCCESS:
      if (action.payload.route) {
        return action.payload.route.name === "directions" ? state : null;
      }
      return state;
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
  routeResult: handleRoute
});
