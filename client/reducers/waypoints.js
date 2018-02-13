import { combineReducers } from 'redux';

import PointFeature from 'utils/geojson';

// Action types
import {
  SET_ORIGIN,
  SET_DESTINATION,
  SET_POI,
  SET_ORIGIN_DESTINATION,
  SWAP_WAYPOINTS,
  TOGGLE_TRIP_PLANNING,
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
    case TOGGLE_TRIP_PLANNING:
      if (action.payload.planningTrip) {
        // Was in trip planning mode, reset
        return null;
      } else {
        // Entering trip planning mode - copy from POI if it exists
        return action.payload.poi;
      }
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
    case TOGGLE_TRIP_PLANNING:
      return action.payload.planningTrip ? null : state;
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
