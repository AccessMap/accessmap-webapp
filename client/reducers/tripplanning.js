import { combineReducers } from 'redux';

import {
  RECEIVE_ROUTE,
  SET_DESTINATION_TEXT,
  SET_ORIGIN_TEXT,
  SET_SEARCH_TEXT,
  SWAP_WAYPOINTS,
  TOGGLE_TRIP_PLANNING,
} from 'actions';

import { defaultTripPlanning as defaults } from './defaults';

const handleRoute = (state = defaults.routeResult, action) => {
  switch (action.type) {
    case TOGGLE_TRIP_PLANNING:
      return action.payload.planningTrip ? null : state;
    case RECEIVE_ROUTE:
      if (action.payload.routeResult.routes.length > 0) {
        return action.payload.routeResult;
      }
      return state;
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
    case TOGGLE_TRIP_PLANNING:
      if (action.payload.planningTrip) {
        // User was planning a trip and has exited that mode
        // TODO: restore and/or never modify original POI search (should be
        // same as hitting 'back' button)
        return state;
      } else {
        // User has entered trip planning mode - copy search text to geocoder
        return {
          ...state,
          originText: state.searchText,
        }
      }
    default:
      return state;
  }
}

export default combineReducers({
  routeResult: handleRoute,
  geocoderText: handleGeocoderText,
});
