import { combineReducers } from 'redux';

import {
  FAILED_ROUTE,
  REQUEST_ROUTE,
  RECEIVE_ROUTE,
  SET_ORIGIN,
  SET_DESTINATION,
  TOGGLE_TRIP_PLANNING,
  SET_INCLINE_IDEAL,
  SET_INCLINE_MAX,
  SET_INCLINE_MIN,
  TOGGLE_CURBRAMPS,
  SET_SEARCH_TEXT,
  SET_ORIGIN_TEXT,
  SET_DESTINATION_TEXT,
  SWAP_WAYPOINTS,
} from 'actions';
import { defaultTripPlanning as defaults } from './defaults';

const handlePlanningTrip = (state = defaults.planningTrip, action) => {
  switch (action.type) {
    case TOGGLE_TRIP_PLANNING:
      return !action.payload;
    case SET_ORIGIN:
    case SET_DESTINATION:
      return true;
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
    case TOGGLE_TRIP_PLANNING:
      return action.payload ? null : state;
    case RECEIVE_ROUTE:
      return action.payload.routes.length > 0 ? action.payload : state;
    default:
      return state;
  }
};

const handleGeocoderText = (state = defaults.geocoderText, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      }
    case SET_ORIGIN_TEXT:
      return {
        ...state,
        originText: action.payload,
      }
    case SET_DESTINATION_TEXT:
      return {
        ...state,
        destinationText: action.payload,
      }
    case SWAP_WAYPOINTS:
      return {
        ...state,
        originText: state.destinationText,
        destinationText: state.originText,
      }
    default:
      return state;
  }
}

export default combineReducers({
  planningTrip: handlePlanningTrip,
  isFetching: handleIsFetching,
  inclineIdeal: handleInclineIdeal,
  inclineMax: handleInclineMax,
  inclineMin: handleInclineMin,
  requireCurbRamps: handleCurbRamps,
  routeResult: handleRoute,
  geocoderText: handleGeocoderText,
});
