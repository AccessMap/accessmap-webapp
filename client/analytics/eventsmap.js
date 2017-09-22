import {
  LOG_BOUNDS,
  MAP_MOVE
} from 'actions';


const logBounds = action => ({
  hitType: 'event',
  eventCategory: 'log-bounds',
  eventAction: action.type,
  payload: {
    bounds: action.payload
  }
});

const mapMove = action => ({
  hitType: 'event',
  eventCategory: 'map-move',
  eventAction: action.type,
  payload: {
    center: action.payload.center,
    zoom: action.payload.zoom,
    bounds: action.payload.bounds
  }
});

const eventsMap = {
  LOG_BOUNDS: logBounds,
  MAP_MOVE: mapMove
};

export { eventsMap };
