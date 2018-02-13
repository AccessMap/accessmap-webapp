import geoViewport from '@mapbox/geo-viewport';
import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import inside from '@turf/inside';

import PointFeature from 'utils/geojson';

// Action types
import {
  LOAD_MAP,
  MAP_MOVE,
  RECEIVE_GEOLOCATION,
  RECEIVE_ROUTE,
  RESIZE_MAP,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_POI,
  SET_CENTER,
  SET_ZOOM,
  SET_CENTER_AND_ZOOM,
} from 'actions';

// Default actions
import { defaultView as defaults } from './defaults';

// OmniCard dimensions for use in calcs that prevent map results don't overlap
// the controls. These are hard-coded for now to avoid needing to put control
// size into the state tree // use CSS selections.
const omniCardDim = {
  width: 350,
  height: 150,
};

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
      const { routeResult, mediaType } = action.payload;

      if (routeResult.routes.length > 0) {
        // Give a little space so that pins can be seen, etc.
        const MARGIN_FACTOR = 0.0;

        // Calculate left/top padding so that route isn't hidden behind widgets
        let fracX;
        let fracY;
        if (mediaType === 'MOBILE') {
          // For mobile, there's only vertically blocking elements
          fracX = 0;
          fracY = state.mapHeight / (state.mapHeight - omniCardDim.height);
        } else {
          // For non-mobile, place to the right of the OmniCard
          fracX = state.mapWidth / (state.mapWidth - omniCardDim.width);
          fracY = 0;
        }

        // FIXME: when this goes global, need to account for longitude delta
        // being negative.
        const bounds = bbox({
          type: 'Feature',
          geometry: routeResult.routes[0].geometry
        });

        // The size of the bounding box, in lat-lon degrees
        const deltaLon = (bounds[2] - bounds[0]);
        const deltaLat = (bounds[3] - bounds[1]);

        // The degrees pad on the outside of the box, so that map markers can
        // be seen.
        const paddingLon = MARGIN_FACTOR * deltaLon;
        const paddingLat = MARGIN_FACTOR * deltaLat

        // The padded dimensions of the bounding box
        const paddedDim = {
          w: bounds[0] - paddingLon,
          e: bounds[2] + paddingLon,
          s: bounds[1] - paddingLat,
          n: bounds[3] + paddingLat,
        }

        // Padded bounding box, adjusted to not overlap widgets
        // NOTE: only left and top adjustments are currently applied
        const dim = {
          w: paddedDim.w - (fracX * deltaLon),
          e: paddedDim.e,
          s: paddedDim.s,
          n: paddedDim.n + (fracY * deltaLat),
        };

        const { center, zoom } = geoViewport.viewport([
          dim.w,
          dim.s,
          dim.e,
          dim.n
        ],
        [state.mapWidth, state.mapHeight],
        0, 17, 512);

        return {
          ...state,
          lng: center[0],
          lat: center[1],
          zoom
        };
      }
      return state;
    }
    case LOAD_MAP:
    case RESIZE_MAP:
      return {
        ...state,
        mapWidth: action.payload.width,
        mapHeight: action.payload.height,
      };
    default:
      return state;
  }
}
