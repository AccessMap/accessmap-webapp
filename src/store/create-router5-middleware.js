import centerInView from "utils/center-in-view";
import getDisplayMode from "utils/display-mode";
import getMediaType from "utils/media-type";
import getVisibleMargins from "utils/get-visible-margins";
import inView from "utils/in-view";
import mapSubview from "utils/map-subview";
import routeBounds from "utils/route-bounds";
import regions from "constants/regions";

import {
  CLOSE_DIRECTIONS,
  EXIT_TRIP_PLANNING,
  LOAD_MAP,
  LOG_IN,
  MAP_MOVE,
  PLAN_TRIP,
  RECEIVE_ROUTE,
  SELECT_REGION,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_POI,
  SET_ZOOM,
  RECEIVE_GEOLOCATION,
  VIEW_ROUTE_INFO,
  setOriginDestination
} from "actions";

const createRouter5Middleware = router => {
  /* eslint-disable no-unused-vars */
  const middleware = store => next => action => {
    /* eslint-enable no-unused-vars */
    switch (action.type) {
      case LOG_IN: {
        // TODO: retrieve history and/or param state and redirect to last known one.
        router.navigate("root");
        break;
      }
      case SELECT_REGION: {
        let region;
        for (let feature of regions.features) {
          if (feature.properties.key === action.payload) {
            region = feature;
            break;
          }
        }
        const { key, lon, lat, zoom } = region.properties;
        const { lon2, lat2 } = centerInView(lon, lat, zoom);
        router.navigate("root", {
          region: key,
          lon,
          lat,
          z: zoom
        });
        break;
      }
      case PLAN_TRIP: {
        // When planning a trip, need to (potentially) enter directions view and
        // update origin/destination (if necessary)
        const { origin, destination } = store.getState().router.route.params;
        // Starting trip planning - move the POI, if it exists, into the origin slot.
        const params = {
          ...router.getState().params,
          wp: [origin, destination]
        };
        router.navigate("directions", params);
        break;
      }
      case EXIT_TRIP_PLANNING: {
        const { lon, lat, z } = store.getState().router.route.params;
        router.navigate("root", { lon, lat, z });
        break;
      }
      case CLOSE_DIRECTIONS: {
        // We need to return to the previous state. I guess the back button will do it?
        history.go(-1);
        break;
      }
      case RECEIVE_ROUTE: {
        const { routeResult } = action.payload;
        const { origin, destination } = store.getState().waypoints;

        if (routeResult.code !== "Ok") break;
        const bounds = routeBounds(routeResult);
        const margins = getVisibleMargins();
        const { center, zoom } = mapSubview(bounds, margins);

        const params = {
          ...router.getState().params,
          lon: center[0],
          lat: center[1],
          z: zoom,
          wp: [origin, destination]
        };

        router.navigate("directions", params);
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
            wp: [action.payload]
          };
          if (!inView(lon, lat, params.lon, params.lat, params.z)) {
            directionsParams.lon = action.payload.lon;
            directionsParams.lat = action.payload.lat;
            directionsParams.z = 16;
          }
          router.navigate("directions", directionsParams);
        } else {
          // Both exist - while route is being found, zoom to include both waypoints
          // and update url
          // FIXME: this doesn't actually zoom to both at the moment
          const directionsParams = {
            ...params,
            wp: [action.payload, destination]
          };
          router.navigate("directions", directionsParams);
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
            wp: [action.payload]
          };
          if (!inView(lon, lat, params.lon, params.lat, params.z)) {
            directionsParams.lon = action.payload.lon;
            directionsParams.lat = action.payload.lat;
            directionsParams.z = 16;
          }
          router.navigate("directions", directionsParams);
        } else {
          // Both exist - while route is being found, zoom to include both waypoints
          // and update url
          // FIXME: this doesn't actually zoom to both at the moment
          const directionsParams = {
            ...params,
            wp: [origin, action.payload]
          };
          router.navigate("directions", directionsParams);
        }

        break;
      }
      case SET_POI: {
        const { name, params } = router.getState();
        const { lon, lat } = action.payload;
        if (!inView(lon, lat, params.lon, params.lat, params.z)) {
          const { lon2, lat2 } = centerInView(lon, lat, 16);
          const updatedParams = { ...params, lon: lon2, lat: lat2 };
          router.navigate(name, updatedParams);
        }
        break;
      }
      case RECEIVE_GEOLOCATION: {
        const { name, params } = router.getState();
        const [lon, lat] = action.payload.coordinates;
        if (!inView(lon, lat, params.lon, params.lat, params.z)) {
          const { lon2, lat2 } = centerInView(lon, lat, 16);
          const updatedParams = { ...params, lon: lon2, lat: lat2 };
          router.navigate(name, updatedParams);
        }
        break;
      }
      case LOAD_MAP: {
        const { name, params } = router.getState();
        if (name === "directions") {
          // Extract params
          const { wp } = params;
          if (wp.length > 1) {
            const origin = wp[0];
            origin.name = [origin.lat, origin.lon].join(", ");
            const destination = wp[1];
            destination.name = [destination.lat, destination.lon].join(", ");
            store.dispatch(setOriginDestination(origin, destination));
          }
        }
        break;
      }
      case SET_ZOOM: {
        const { name, params } = router.getState();
        router.navigate(name, { ...params, z: action.payload });
        break;
      }
      case MAP_MOVE: {
        const { name, params } = router.getState();
        const { lon, lat, zoom: z } = action.payload;
        router.navigate(name, { ...params, lon, lat, z });
        break;
      }
      case VIEW_ROUTE_INFO: {
        // Place route in the middle of the map. Assumed that it's half of the view for
        // mobile
        const { view } = store.getState();
        const { name, params } = router.getState();

        const routeResult = action.payload;

        const mediaType = getMediaType();
        if (mediaType !== "mobile") break;
        const bounds = routeBounds(routeResult);
        const displayMode = getDisplayMode();
        const margins = {
          left: displayMode === "landscape" ? view.mapWidth / 2 : 0,
          bottom: displayMode === "portrait" ? view.mapHeight / 2 : 0,
          right: 48, // Accounts for zoom buttons
          top: 0
        };

        const { center, zoom } = mapSubview(bounds, margins);

        router.navigate(name, {
          ...params,
          lon: center[0],
          lat: center[1],
          z: zoom
        });
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
