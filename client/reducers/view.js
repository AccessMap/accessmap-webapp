// Note: using geo-viewport from a pull request that allows decimal zooms
import bboxPolygon from '@turf/bbox-polygon';
import inside from '@turf/inside';

import getDisplayMode from 'utils/display-mode';
import getMediaType from 'utils/media-type';
import mapSubview from 'utils/map-subview';
import PointFeature from 'utils/geojson';
import routeBounds from 'utils/route-bounds';

// Action types
import {
  CLOSE_DIRECTIONS,
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
  VIEW_DIRECTIONS,
} from 'actions';

// Default actions
import { defaultView as defaults } from './defaults';

export default (state = defaults, action) => {
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
          zoom: 16,
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
        zoom: action.payload.zoom,
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
        zoom: 16,
      };
    case RECEIVE_ROUTE: {
      const { routeResult } = action.payload;

      if (routeResult.routes.length > 0) {
        /*
         * Place the route in the middle of the main map space:
         *   - Mobile portrait: below OmniCard
         *   - Mobile landscape: to the right of the OmniCard
         *   - Tablet/Desktop: to the right of the OmniCard
         */

        const bounds = routeBounds(routeResult);

        // Calculate the space available for displaying the route
        // TODO: subtract toolbar height
        const margins = {
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
        };

        const omnicard = document.getElementsByClassName('omnicard')[0];

        const mediaType = getMediaType();
        const displayMode = getDisplayMode();

        if (mediaType === 'mobile') {
          if (displayMode === 'portrait') {
            margins.top += omnicard.clientHeight;
          }
          if (displayMode === 'landscape') {
            margins.left += omnicard.clientWidth;
          }
          // Padding of 8 on top of omnicard. Programmatic way to get this?
          margins.top += 8;
          margins.right += 48;
        } else {
          // Tablet or desktop
          margins.left += omnicard.clientWidth;
          // Padding of 8 to left of omnicard. Programmatic way to get this?
          margins.left += 8;
          // this is a hard-coded magic number for the foating buttons
          margins.right += 48;
          // this is a hard-coded magic number for the topbar
          margins.top += 64;
        }

        const {
          center,
          zoom,
        } = mapSubview(bounds, state.mapWidth, state.mapHeight, margins);

        return {
          ...state,
          lng: center[0],
          lat: center[1],
          zoom,
          omniCardHeight: omnicard.clientHeight,
          omniCardWidth: omnicard.clientWidth,
        };
      }
      return state;
    }
    case VIEW_DIRECTIONS: {
      const mediaType = getMediaType();
      if (mediaType !== 'mobile') return state;
      /*
       * Place the route in the middle of the main map space:
       *   - Mobile portrait: below OmniCard
       *   - Mobile landscape: to the right of the OmniCard
       *   - Tablet/Desktop: to the right of the OmniCard
       */

      const routeResult = action.payload;

      const bounds = routeBounds(routeResult);

      const displayMode = getDisplayMode();

      // Calculate the space available for displaying the route
      // TODO: subtract toolbar height
      const margins = {
        left: displayMode === 'landscape' ? state.mapWidth / 2 : 0,
        bottom: displayMode === 'portrait' ? state.mapHeight / 2 : 0,
        right: 0,
        top: 0,
      };

      const {
        center,
        zoom,
      } = mapSubview(bounds, state.mapWidth, state.mapHeight, margins);

      return {
        ...state,
        lng: center[0],
        lat: center[1],
        zoom,
      };
    }
    case CLOSE_DIRECTIONS: {
      const mediaType = getMediaType();
      if (mediaType !== 'mobile') return state;

      const routeResult = action.payload;

      const bounds = routeBounds(routeResult);

      const displayMode = getDisplayMode();

      const margins = {
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
      };

      // TODO: relying on state for the height of the omniCard has issues.
      // 1. Shouldn't really be part of state anyways
      // 2. 'Remembering' the last height doesn't work when switching between
      // portrait and landscape modes (mobile or tablet).
      if (displayMode === 'portrait') {
        margins.top += state.omniCardHeight;
        margins.top += 8;
      }
      if (displayMode === 'landscape') {
        margins.left += state.omniCardWidth;
        margins.left += 8;
      }

      margins.right += 48;

      const {
        center,
        zoom,
      } = mapSubview(bounds, state.mapWidth, state.mapHeight, margins);

      return {
        ...state,
        lng: center[0],
        lat: center[1],
        zoom,
      };
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
};
