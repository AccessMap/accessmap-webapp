// Note: using geo-viewport from a pull request that allows decimal zooms
import getDisplayMode from 'utils/display-mode';
import getMediaType from 'utils/media-type';
import mapSubview from 'utils/map-subview';
import routeBounds from 'utils/route-bounds';

// Action types
import {
  CLOSE_DIRECTIONS,
  MAP_MOVE,
  RECEIVE_GEOLOCATION,
  RECEIVE_ROUTE,
  RESIZE_MAP,
  SET_CENTER,
  SET_ZOOM,
  SET_CENTER_AND_ZOOM,
  VIEW_DIRECTIONS,
  VIEW_ROUTE_INFO,
} from 'actions';

// Default actions
import { defaultView as defaults } from './defaults';

export default (state = defaults, action) => {
  switch (action.type) {
    case SET_CENTER:
      return { ...state, lon: action.payload[0], lat: action.payload[1] };
    case SET_ZOOM:
      return { ...state, zoom: action.payload };
    case SET_CENTER_AND_ZOOM:
      return {
        ...state,
        lon: action.payload.center[0],
        lat: action.payload.center[1],
        zoom: action.payload.zoom,
      };
    case MAP_MOVE:
      return {
        ...state,
        lon: action.payload.lon,
        lat: action.payload.lat,
        zoom: action.payload.zoom,
      };
    case RECEIVE_GEOLOCATION:
      return {
        ...state,
        lon: action.payload.coordinates[0],
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

        if (omnicard) {
          if (mediaType === 'mobile') {
            if (displayMode === 'portrait') {
              margins.top += omnicard.clientHeight + 16;
            }
            if (displayMode === 'landscape') {
              margins.left += omnicard.clientWidth + 16;
            }
          } else {
            margins.left += omnicard.clientWidth + 16;
          }
        }

        // 128 px is expected height of the card. We can't get the height of
        // the card dynamically, as it gets created as a result of this action.
        if (mediaType === 'mobile') {
          if (displayMode === 'portrait') {
            margins.bottom += 128 + 16;
          }
        } else {
          margins.bottom += 128 + 16;
        }

        // To account for zoom buttons
        margins.right += 48;

        const {
          center,
          zoom,
        } = mapSubview(bounds, margins);

        return {
          ...state,
          lon: center[0],
          lat: center[1],
          zoom,
        };
      }
      return state;
    }
    case VIEW_DIRECTIONS:
    case VIEW_ROUTE_INFO: {
      const mediaType = getMediaType();
      if (mediaType !== 'mobile') return state;
      /*
       * Place the route in the middle of the main map space:
       *   - Mobile portrait: below OmniCard
       *   - Everything else: to the right of the OmniCard
       */

      const routeResult = action.payload;

      const bounds = routeBounds(routeResult);

      const displayMode = getDisplayMode();

      // Calculate the space available for displaying the route
      const margins = {
        left: displayMode === 'landscape' ? state.mapWidth / 2 : 0,
        bottom: displayMode === 'portrait' ? state.mapHeight / 2 : 0,
        right: 48,  // Accounts for zoom buttons
        top: 0,
      };

      const {
        center,
        zoom,
      } = mapSubview(bounds, state.mapWidth, state.mapHeight, margins);

      return {
        ...state,
        lon: center[0],
        lat: center[1],
        zoom,
        lastView: {
          lon: state.lon,
          lat: state.lat,
          zoom: state.zoom,
        },
      };
    }
    case CLOSE_DIRECTIONS: {
      const mediaType = getMediaType();
      if (mediaType !== 'mobile') return state;
      return {
        ...state,
        lon: state.lastView.lon,
        lat: state.lastView.lat,
        zoom: state.lastView.zoom,
        lastView: null,
      };
    }
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
