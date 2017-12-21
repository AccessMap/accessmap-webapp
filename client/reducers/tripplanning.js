import { combineReducers } from 'redux';

import {
  FAILED_ROUTE,
  REQUEST_ROUTE,
  RECEIVE_ROUTE,
  SET_ORIGIN,
  SET_DESTINATION,
  TRIP_PLANNING_ON,
  TRIP_PLANNING_OFF,
  SET_INCLINE_IDEAL,
  SET_INCLINE_MAX,
  SET_INCLINE_MIN,
  TOGGLE_CURBRAMPS
} from 'actions';
import { defaultTripPlanning as defaults } from './defaults';

const handlePlanningTrip = (state = defaults.planningTrip, action) => {
  switch (action.type) {
    case TRIP_PLANNING_ON:
    case SET_ORIGIN:
    case SET_DESTINATION:
      return true;
    case TRIP_PLANNING_OFF:
      return false;
    default:
      return state;
  }
};

const handleIsFetching = (state = defaults.isFetching, action) => {
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

const handleInclineIdeal = (state = defaults.inclineIdeal, action) => {
  switch (action.type) {
    case SET_INCLINE_IDEAL:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineMax = (state = defaults.inclineMax, action) => {
  switch (action.type) {
    case SET_INCLINE_MAX:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineMin = (state = defaults.inclineMin, action) => {
  switch (action.type) {
    case SET_INCLINE_MIN:
      return action.payload;
    default:
      return state;
  }
};

const handleCurbRamps = (state = defaults.requireCurbRamps, action) => {
  switch (action.type) {
    case TOGGLE_CURBRAMPS:
      return !state;
    default:
      return state;
  }
};

const handleRoute = (state = defaults.routeResult, action) => {
  switch (action.type) {
    case TRIP_PLANNING_OFF:
      return null;
    case RECEIVE_ROUTE:
      if (action.payload.routes.length > 0) return action.payload;
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  planningTrip: handlePlanningTrip,
  isFetching: handleIsFetching,
  inclineIdeal: handleInclineIdeal,
  inclineMax: handleInclineMax,
  inclineMin: handleInclineMin,
  requireCurbRamps: handleCurbRamps,
  routeResult: handleRoute,
});
