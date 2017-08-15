import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import inside from '@turf/inside';

// Action types
import {
  LOG_BOUNDS,
  RECEIVE_ROUTE,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_POI,
  SET_CENTER,
  SET_ZOOM,
  SET_CENTER_AND_ZOOM,
  MAP_MOVE,
  RECEIVE_GEOLOCATION
} from 'actions';

// Default actions
import { defaultView as defaults } from './defaults';

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

export default function handleView(state = defaults, action) {
  switch (action.type) {
    case SET_ORIGIN:
    case SET_DESTINATION:
    case SET_POI: {
      const waypoint = makeWaypoint(action.payload.location,
                                    action.payload.name);
      const inView = inside(waypoint, bboxPolygon(state.bounds));
      if (!inView) {
        return {
          ...state,
          center: action.payload.location,
          zoom: 17
        };
      }
      return state;
    }
    case SET_CENTER:
      return { ...state, center: action.payload };
    case SET_ZOOM:
      return { ...state, zoom: action.payload };
    case SET_CENTER_AND_ZOOM:
      return {
        ...state,
        center: action.payload.center,
        zoom: action.payload.zoom
      };
    case MAP_MOVE:
      return {
        ...state,
        center: action.payload.center,
        zoom: action.payload.zoom,
        bounds: action.payload.bounds
      };
    case LOG_BOUNDS:
      return { ...state, bounds: action.payload };
    case RECEIVE_GEOLOCATION:
      return {
        ...state,
        center: action.payload.coordinates,
        zoom: 16
      };
    case RECEIVE_ROUTE: {
      // currently only showing a single route - calculate zoom + center given
      // a bounds
      if (action.payload.routes.length > 0) {
        const bounds = bbox({
          type: 'Feature',
          geometry: action.payload.routes[0].geometry
        });
        const center = [
          (bounds[2] + bounds[0]) / 2,
          (bounds[3] + bounds[1]) / 2
        ];
        const padding = 0.3;
        const latDiff = (1 + padding) * (bounds[3] - bounds[1]);
        const lonDiff = (1 + padding) * (bounds[2] - bounds[0]);
        const maxDiff = Math.max(latDiff, lonDiff);
        let zoom;
        if (maxDiff < (360 / (2 ** 20))) {
          zoom = 21;
        } else {
          zoom = -1 * ((Math.log(maxDiff) / Math.log(2)) - (Math.log(360) / Math.log(2)));
          if (zoom < 1) zoom = 1;
        }
        return {
          ...state,
          center,
          zoom
        };
      }
      return state;
    }
    default:
      return state;
  }
}
