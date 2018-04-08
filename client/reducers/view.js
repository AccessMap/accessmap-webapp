// Note: using geo-viewport from a pull request that allows decimal zooms
import geoViewport from '@mapbox/geo-viewport';
import SphericalMercator from '@mapbox/sphericalmercator';
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
      const { routeResult, mediaType, omniCardDim } = action.payload;

      if (routeResult.routes.length > 0) {
        /*
         * Place the route in the middle of the main map space:
         *   - Mobile portrait: below OmniCard
         *   - Mobile landscape: to the right of the OmniCard
         *   - Tablet/Desktop: to the right of the OmniCard
         */
        const tileSize = 512;

        // FIXME: the routeResult doesn't include the start/end points
        // The routeResult doesn't include origin/destination
        const bounds = bbox({
          type: 'Feature',
          geometry: routeResult.routes[0].geometry,
        });
        const [ox, oy] = routeResult.origin.geometry.coordinates;
        const [ex, ey] = routeResult.destination.geometry.coordinates;
        bounds[0] = Math.min(bounds[0], ox, ex);
        bounds[1] = Math.min(bounds[1], oy, ey);
        bounds[2] = Math.max(bounds[2], ox, ex);
        bounds[3] = Math.max(bounds[3], oy, ey);

        // Calculate the space available for displaying the route
        // TODO: subtract toolbar height
        const margins = {
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
        };

        // TODO:  Extract this info more programmatically - some of these
        // numbers are magic / hard-coded and may change as we tweak styles.
        // Should be able to extract from these components' dimensions:
        //   - map-overlay
        //   - omnicard
        //   - topbar
        //   - floatingbuttons
        // FIXME: portrait mode is broken - need to know which mode we're in
        if (mediaType === 'MOBILE') {
          margins.top += omniCardDim.height;
          // Padding of 8 on top of omnicard. Programmatic way to get this?
          margins.top += 8;
        } else {
          // Tablet or desktop
          margins.left += omniCardDim.width;
          // Padding of 8 to left of omnicard. Programmatic way to get this?
          margins.left += 8;
          // this is a hard-coded magic number for the foating buttons
          margins.right += 48;
          // this is a hard-coded magic number for the topbar
          margins.top += 64;
        }

        // These are the pixel dimensions of the map view
        const mapView = {
          width: state.mapWidth - margins.left - margins.right,
          height: state.mapHeight - margins.bottom - margins.top,
        };
        const viewAspect = mapView.width / mapView.height;

        // Get the bounds in web mercator - proportional (equivalent?) to
        // pixels
        const sm = new SphericalMercator(tileSize);
        const boundsWM = sm.convert(bounds, '900913');
        const routeAspect = (boundsWM[2] - boundsWM[0]) / (boundsWM[3] - boundsWM[1]);

        /*
         * Expand the bounding box with some padding for the route
         */

        // Padding in pixels
        const padding = 80;
        // Convert to web mercator units

        /*
         * Expand the bounds to fit in the map view area (px and py)
         */

        // Calculate the aspect ratio of the route
        let dxWM = boundsWM[2] - boundsWM[0];
        let dyWM = boundsWM[3] - boundsWM[1];

        let paddingWM;
        let side;
        if (viewAspect > routeAspect) {
          // View aspect is wider, so route will be centered on X axis
          // - expand route west/east bbox to match aspect of view

          // Use the y dim to find the padding
          paddingWM = (dyWM / mapView.height) * padding;

          side = ((viewAspect * dyWM) - dxWM) / 2;
          boundsWM[0] -= side;
          boundsWM[2] += side;
        } else {
          // Route aspect is taller, so route will be centered on Y axis
          // - expand route north/west bbox to match aspect of view
          // Use the x dim to find the padding
          paddingWM = (dxWM / mapView.width) * padding;

          side = ((dxWM / viewAspect) - dyWM) / 2;
          boundsWM[1] -= side;
          boundsWM[3] += side;
        }

        const paddedBoundsWM = [
          boundsWM[0] - paddingWM,
          boundsWM[1] - paddingWM,
          boundsWM[2] + paddingWM,
          boundsWM[3] + paddingWM,
        ];

        dxWM = paddedBoundsWM[2] - paddedBoundsWM[0];
        dyWM = paddedBoundsWM[3] - paddedBoundsWM[1];

        /*
         * Expand the bounding box to include the previous element margins
         */

        const ratioX = dxWM / mapView.width;
        const ratioY = dyWM / mapView.height;

        const marginsWM = {
          left: ((margins.left + mapView.width) * ratioX) - dxWM,
          right: ((margins.right + mapView.width) * ratioX) - dxWM,
          bottom: ((margins.bottom + mapView.height) * ratioY) - dyWM,
          top: ((margins.top + mapView.height) * ratioY) - dyWM,
        };

        // Adjust bounds to fit whole map
        const boundsWMFull = [
          paddedBoundsWM[0] - marginsWM.left,
          paddedBoundsWM[1] - marginsWM.bottom,
          paddedBoundsWM[2] + marginsWM.right,
          paddedBoundsWM[3] + marginsWM.top,
        ];

        // Return to lon-lat
        const boundsFull = sm.convert(boundsWMFull, 'WGS84');

        const { center, zoom } = geoViewport.viewport(
          boundsFull,
          [state.mapWidth, state.mapHeight],
          0,
          22,
          tileSize,
          true,
        );

        return {
          ...state,
          lng: center[0],
          lat: center[1],
          zoom,
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
};
