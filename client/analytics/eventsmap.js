import {
  LOG_BOUNDS,
  MAP_MOVE
} from 'actions';
// TODO: Catch payloads containing undefined values so we don't get silent
// failures, particularly when adding/removing/changing events.

// TODO: Break nested payloads into simpler data / have it coerced into
// geometries.

// TODO: integrate with react-beacon?


const logBounds = action => ({
  eventAction: action.type,
  payload: {
    bounds: action.payload
  }
});

// TODO: Remove zoom and bounds?
const mapMove = action => ({
  eventAction: action.type,
  payload: {
    center: action.payload.center,
    zoom: action.payload.zoom,
    bounds: action.payload.bounds
  }
});

const toggleTripPlanning = action => ({
  eventAction: action.type,
});

const eventsMap = {
  LOG_BOUNDS: logBounds,
  MAP_MOVE: mapMove,
  TRIP_PLANNING_ON: toggleTripPlanning,
  TRIP_PLANNING_OFF: toggleTripPlanning,
};

export { eventsMap };
