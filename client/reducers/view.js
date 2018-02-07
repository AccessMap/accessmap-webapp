import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import inside from '@turf/inside';

import PointFeature from 'utils/geojson';

// Action types
import {
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

export default function handleView(state = defaults, action) {
  switch (action.type) {
    case SET_ORIGIN:
    case SET_DESTINATION:
    case SET_POI: {
      const waypoint = PointFeature(action.payload.lng,
                                    action.payload.lat,
                                    { name: action.payload.name });
      const inView = inside(waypoint, bboxPolygon(action.payload.bounds));
      if (!inView) {
        return {
          ...state,
          lng: action.payload.lng,
          lat: action.payload.lat,
          zoom: 16
        };
      }
      return state;
    }
    case SET_CENTER:
      return { ...state, lng: action.payload[0], lat: action.payload[1] };
    case SET_ZOOM:
      return { ...state, zoom: action.payload };
    case SET_CENTER_AND_ZOOM:
      return {
        ...state,
        lng: action.payload.center[0],
        lat: action.payload.center[1],
        zoom: action.payload.zoom
      };
    case MAP_MOVE:
      return {
        ...state,
        lng: action.payload.center[0],
        lat: action.payload.center[1],
        zoom: action.payload.zoom,
      };
    case RECEIVE_GEOLOCATION:
      return {
        ...state,
        lng: action.payload.coordinates[0],
        lat: action.payload.coordinates[1],
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
        const padding = 0.6;
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
          lng: center[0],
          lat: center[1],
          zoom
        };
      }
      return state;
    }
    default:
      return state;
  }
}
