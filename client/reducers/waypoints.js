import { combineReducers } from 'redux';

import PointFeature from 'utils/geojson';

// Action types
import {
  SET_ORIGIN,
  SET_DESTINATION,
  SET_POI,
  SET_ORIGIN_DESTINATION,
  SWAP_WAYPOINTS,
  TRIP_PLANNING_ON,
  TRIP_PLANNING_OFF
} from 'actions';

// Default actions
import { defaultWaypoints as defaults } from './defaults';

// Reducers
const handleOrigin = (state = defaults.origin, action) => {
  switch (action.type) {
    case SET_ORIGIN:
      return PointFeature(action.payload.lng,
                          action.payload.lat,
                          { name: action.payload.name });
    case SET_ORIGIN_DESTINATION:
      return PointFeature(action.payload.originLng,
                          action.payload.originLat,
                          { name: action.payload.name });
    case SWAP_WAYPOINTS:
      return action.payload.destination;
    case TRIP_PLANNING_OFF:
      return null;
    default:
      return state;
  }
};

const handleDestination = (state = defaults.destination, action) => {
  switch (action.type) {
    case SET_DESTINATION:
      return PointFeature(action.payload.lng,
                          action.payload.lat,
                          { name: action.payload.name });
    case SET_ORIGIN_DESTINATION:
      return PointFeature(action.payload.destLng,
                          action.payload.destLat,
                          { name: action.payload.name });
    case SWAP_WAYPOINTS:
      return action.payload.origin;
    case TRIP_PLANNING_ON:
      return action.payload ? action.payload : null;
    case TRIP_PLANNING_OFF:
      return null;
    default:
      return state;
  }
};

const handlePOI = (state = defaults.poi, action) => {
  switch (action.type) {
    case SET_POI:
      return PointFeature(action.payload.lng,
                          action.payload.lat,
                          { name: action.payload.name });
    default:
      return state;
  }
};

export default combineReducers({
  destination: handleDestination,
  origin: handleOrigin,
  poi: handlePOI
});
