import centerInView from 'utils/center-in-view';
import getDisplayMode from 'utils/display-mode';
import getMediaType from 'utils/media-type';
import getVisibleMargins from 'utils/get-visible-margins';
import inView from 'utils/in-view';
import mapSubview from 'utils/map-subview';
import routeBounds from 'utils/route-bounds';

import {
  TOGGLE_TRIP_PLANNING,
  RECEIVE_ROUTE,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_POI,
  LOAD_MAP,
  SET_ZOOM,
  CLOSE_DIRECTIONS,
  MAP_MOVE,
  VIEW_ROUTE_INFO,
  setOriginDestination,
} from 'actions';


const createRouter5Middleware = (router) => {
  /* eslint-disable no-unused-vars */
  const middleware = store => next => (action) => {
  /* eslint-enable no-unused-vars */
    // FIXME: replace action type strings with imported constant vars
    switch (action.type) {
      case TOGGLE_TRIP_PLANNING: {
        const { lon, lat, zoom } = router.getState().params;
        const { origin, poi } = store.getState().waypoints;
        const newParams = { lon, lat, zoom };

        if (action.payload.planningTrip) {
          // No longer planning a trip - use only location params
          router.navigate('root.home.at', newParams);
        } else {
          // Starting trip planning - move the POI, if it exists, into the origin slot.
          if (!origin && poi) {
            newParams.origin = poi;
          }
          router.navigate('root.directions.at', newParams);
        }
        break;
      }
      case RECEIVE_ROUTE: {
        const { params } = router.getState();
        const { routeResult } = action.payload;
        if (routeResult.code !== 'Ok') break;
        const bounds = routeBounds(routeResult);
        const margins = getVisibleMargins();
        const { center, zoom } = mapSubview(bounds, margins);

        const directionsParams = {
          ...params,
          lon: center[0],
          lat: center[1],
          zoom,
        };

        router.navigate('root.directions.waypoints.at', directionsParams);
        break;
      }
      case SET_ORIGIN: {
        const { params } = router.getState();
        const { destination } = store.getState().waypoints;
        // TODO: check if it's already in view
        // TODO: use centered-in-view helper function
        const { lon, lat } = action.payload;
        if (!destination) {
          // Zoom to origin if no destination is set
          const directionsParams = {
            ...params,
            waypoints: [action.payload],
          };
          if (!inView(lon, lat, params.lon, params.lat, params.zoom)) {
            directionsParams.lon = action.payload.lon;
            directionsParams.lat = action.payload.lat;
            directionsParams.zoom = 16;
          }
          router.navigate('root.directions.waypoints.at', directionsParams);
        } else {
          // Both exist - while route is being found, zoom to include both waypoints
          // and update url
          // FIXME: this doesn't actually zoom to both at the moment
          const directionsParams = {
            ...params,
            waypoints: [action.payload, destination],
          };
          router.navigate('root.directions.waypoints.at', directionsParams);
        }
        break;
      }
      case SET_DESTINATION: {
        const { params } = router.getState();
        const { origin } = store.getState().waypoints;
        // TODO: check if it's already in view
        // TODO: use centered-in-view helper function
        const { lon, lat } = action.payload;
        if (!origin) {
          // Zoom to origin if no destination is set and it's out of view
          const directionsParams = {
            ...params,
            waypoints: [action.payload],
          };
          if (!inView(lon, lat, params.lon, params.lat, params.zoom)) {
            directionsParams.lon = action.payload.lon;
            directionsParams.lat = action.payload.lat;
            directionsParams.zoom = 16;
          }
          router.navigate('root.directions.waypoints.at', directionsParams);
        } else {
          // Both exist - while route is being found, zoom to include both waypoints
          // and update url
          // FIXME: this doesn't actually zoom to both at the moment
          const directionsParams = {
            ...params,
            waypoints: [origin, action.payload],
          };
          router.navigate('root.directions.waypoints.at', directionsParams);
        }

        break;
      }
      case SET_POI: {
        const { name, params } = router.getState();
        const { lon, lat } = action.payload;
        if (!inView(lon, lat, params.lon, params.lat, params.zoom)) {
          const center = centerInView(lon, lat, 16);
          const updatedParams = { ...params, lon: center[0], lat: center[1] };
          const routeName = name.endsWith('.at') ? name : `${name}.at`;
          router.navigate(routeName, updatedParams);
        }
        break;
      }
      case LOAD_MAP: {
        // TODO: don't even need the store for 'routerState', use the router object.
        const { name, params } = router.getState();
        const { lon, lat, zoom } = action.payload;
        const waypointsRoutes = [
          'root.directions.waypoints',
          'root.directions.waypoints.at',
        ];
        if (name === 'root.home') {
          router.navigate('root.home.at', { lon, lat, zoom });
        } else if (waypointsRoutes.includes(name)) {
          // Extract params
          const { waypoints } = params;
          if (waypoints.length > 1) {
            const origin = waypoints[0];
            origin.name = [origin.lat, origin.lon].join(', ');
            const destination = waypoints[1];
            destination.name = [destination.lat, destination.lon].join(', ');
            store.dispatch(setOriginDestination(origin, destination));
          }
        }
        break;
      }
      case SET_ZOOM: {
        const { name, params } = router.getState();
        const routeName = name.endsWith('.at') ? name : `${name}.at`;
        router.navigate(routeName, { ...params, zoom: action.payload });
        break;
      }
      case CLOSE_DIRECTIONS: {
        const { params } = router.getState();
        const routeResult = action.payload;
        const bounds = routeBounds(routeResult);
        const margins = getVisibleMargins();
        const { center, zoom } = mapSubview(bounds, margins);

        const directionsParams = {
          ...params,
          lon: center[0],
          lat: center[1],
          zoom,
        };
        // TODO: extract 'navigate to other area' into its own action creator
        router.navigate('root.directions.waypoints.at', directionsParams);
        break;
      }
      case MAP_MOVE: {
        const { name, params } = router.getState();
        const { lon, lat, zoom } = action.payload;
        const routeName = name.endsWith('.at') ? name : `${name}.at`;
        router.navigate(routeName, { ...params, lon, lat, zoom });
        break;
      }
      case VIEW_ROUTE_INFO: {
        // Place route in the middle of the map. Assumed that it's half of the view for
        // mobile
        const { view } = store.getState();
        const { name, params } = router.getState();

        const routeResult = action.payload;

        const mediaType = getMediaType();
        if (mediaType !== 'mobile') break;
        const bounds = routeBounds(routeResult);
        const displayMode = getDisplayMode();
        const margins = {
          left: displayMode === 'landscape' ? view.mapWidth / 2 : 0,
          bottom: displayMode === 'portrait' ? view.mapHeight / 2 : 0,
          right: 48,  // Accounts for zoom buttons
          top: 0,
        };

        const {
          center,
          zoom,
        } = mapSubview(bounds, margins);

        const routeName = name.endsWith('.at') ? name : `${name}.at`;
        router.navigate(routeName, { ...params, lon: center[0], lat: center[1], zoom });
        break;
      }
      default:
        break;
    }
    next(action);
  };

  return middleware;
};

export default createRouter5Middleware;
