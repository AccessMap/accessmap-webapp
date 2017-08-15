import { combineReducers } from 'redux';

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

const makeWaypoint = (coordinates, name) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates
  },
  properties: {
    name: name === undefined ? '' : name
  }
});

// Reducers
const handleOrigin = (state = defaults.origin, action) => {
  switch (action.type) {
    case SET_ORIGIN:
      return makeWaypoint(action.payload.location, action.payload.name);
    case SET_ORIGIN_DESTINATION:
      return makeWaypoint(action.payload.origin.location,
                          action.payload.origin.name);
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
      return makeWaypoint(action.payload.location, action.payload.name);
    case SET_ORIGIN_DESTINATION:
      return makeWaypoint(action.payload.destination.location,
                          action.payload.destination.name);
    case SWAP_WAYPOINTS:
      return action.payload.origin;
    case TRIP_PLANNING_ON:
      return action.payload;
    case TRIP_PLANNING_OFF:
      return null;
    default:
      return state;
  }
};

const handlePOI = (state = defaults.poi, action) => {
  switch (action.type) {
    case SET_ORIGIN:
    case SET_DESTINATION:
      return null;
    case SET_POI:
      return makeWaypoint(action.payload.location, action.payload.name);
    case TRIP_PLANNING_ON:
      return null;
    case TRIP_PLANNING_OFF:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  destination: handleDestination,
  origin: handleOrigin,
  poi: handlePOI
});
