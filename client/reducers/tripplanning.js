import { combineReducers } from 'redux';

import {
  FAILED_ROUTE,
  REQUEST_ROUTE,
  RECEIVE_ROUTE,
  SET_ORIGIN,
  SET_DESTINATION,
  TOGGLE_TRIP_PLANNING,
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
  routeResult: handleRoute,
  geocoderText: handleGeocoderText,
});
