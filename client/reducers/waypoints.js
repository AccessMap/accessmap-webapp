import { actionTypes as router5Types } from 'redux-router5';

import PointFeature from 'utils/geojson';

// Action types
import {
  SET_ORIGIN,
  SET_DESTINATION,
  SET_POI,
  SET_ORIGIN_DESTINATION,
  SWAP_WAYPOINTS,
} from 'actions';

// Default actions
import { defaultWaypoints as defaults } from './defaults';

const handleWaypoints = (state = defaults, action) => {
  switch (action.type) {
    case SET_POI:
      return {
        ...state,
        poi: PointFeature(action.payload.lng,
                          action.payload.lat,
                          { name: action.payload.name }),
      };
    case SET_ORIGIN:
      return {
        ...state,
        origin: PointFeature(action.payload.lng,
                             action.payload.lat,
                             { name: action.payload.name }),
      };
    case SET_DESTINATION:
      return {
        ...state,
        destination: PointFeature(action.payload.lng,
                                  action.payload.lat,
                                  { name: action.payload.name }),
      };
    case SET_ORIGIN_DESTINATION:
      return {
        ...state,
        origin: PointFeature(action.payload.origin.lon,
                             action.payload.origin.lat,
                             { name: action.payload.origin.name }),
        destination: PointFeature(action.payload.destination.lon,
                                  action.payload.destination.lat,
                                  { name: action.payload.destination.name }),
      };
    case SWAP_WAYPOINTS:
      return {
        ...state,
        origin: action.payload.destination,
        destination: action.payload.origin,
      };
    case router5Types.TRANSITION_SUCCESS: {
      if (!action.payload.route ||
          !action.payload.route.name.startsWith('root.directions')) {
        return { ...state, origin: null, destination: null };
      }
      // If this is 'rehydrating' from the URL, catch and update
      const { origin, destination } = action.payload.route.params;
      const newOrigin = (!state.origin && origin) ? origin : state.origin;
      const newDestination = (!state.destination && destination) ? destination : state.destination;
      return { ...state, origin: newOrigin, destination: newDestination };
    }
    default:
      return state;
  }
};

export default handleWaypoints;
