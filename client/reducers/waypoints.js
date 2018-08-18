import { actionTypes as router5Types } from 'redux-router5';

// Action types
import {
  EXIT_TRIP_PLANNING,
  PLAN_TRIP,
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
        poi: action.payload,
      };
    case SET_ORIGIN:
      return {
        ...state,
        origin: action.payload,
        poi: null,
      };
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload,
        poi: null,
      };
    case SET_ORIGIN_DESTINATION:
      return {
        ...state,
        origin: action.payload.origin,
        destination: action.payload.destination,
        poi: null,
      };
    case SWAP_WAYPOINTS:
      return {
        ...state,
        origin: action.payload.destination,
        destination: action.payload.origin,
      };
    case PLAN_TRIP:
      return {
        ...state,
        origin: state.poi || null,
      };
    case EXIT_TRIP_PLANNING:
      return {
        ...state,
        origin: null,
        destination: null,
      };
    case router5Types.TRANSITION_SUCCESS: {
      if (!action.payload.route ||
          !action.payload.route.name === 'directions') {
        // We've exited directions mode - clear out origin/destination
        return { ...state, origin: null, destination: null };
      }
      // If this is 'rehydrating' directions mode from the URL, catch and
      // update
      const { origin, destination } = action.payload.route.params;
      let newOrigin = state.origin;
      if (!state.origin) {
        // Origin isn't set.
        if (origin) {
          // Attempt to grab it from the URL
          newOrigin = origin;
        } else {
          // Attempt to grab a previously-selected POI
          newOrigin = state.poi;
        }
      }
      const newDestination = (!state.destination && destination) ? destination : state.destination;
      return { ...state, origin: newOrigin, destination: newDestination };
    }
    default:
      return state;
  }
};

export default handleWaypoints;
