import inView from 'utils/in-view';
import getVisibleMargins from 'utils/get-visible-margins';
import centerInView from 'utils/center-in-view';
import routeBounds from 'utils/route-bounds';
import mapSubview from 'utils/map-subview';

// Action types
import { actions as router5 } from 'redux-router5';

// Analytics settings
export const ENABLE_ANALYTICS = 'ENABLE_ANALYTICS';
export const DISABLE_ANALYTICS = 'DISABLE_ANALYTICS';

// Toasts - small temporary messages for the user on the bottom of the screen
export const ADD_TOAST = 'ADD_TOAST';
export const POP_TOAST = 'POP_TOAST';

// Link clicks
export const CLICK_ABOUT_LINK = 'CLICK_ABOUT_LINK';
export const CLICK_CONTACT_LINK = 'CLICK_CONTACT_LINK';
export const CLOSE_LINK_OVERLAY = 'CLOSE_LINK_OVERLAY';

// Direct activity changes
export const VIEW_MAP_INFO = 'VIEW_MAP_INFO';
export const CLOSE_MAP_INFO = 'CLOSE_MAP_INFO';
export const TOGGLE_TRIP_PLANNING = 'TOGGLE_TRIP_PLANNING';
export const TOGGLE_SETTING_PROFILE = 'TOGGLE_SETTING_PROFILE';

// Routing profile settings
export const SET_SPEED = 'SET_SPEED';
export const SET_INCLINE_MAX = 'SET_INCLINE_MAX';
export const SET_INCLINE_MIN = 'SET_INCLINE_MIN';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILE_DEFAULT = 'SET_PROFILE_DEFAULT';
export const TOGGLE_CURBRAMPS = 'TOGGLE_CURBRAMPS';

// Settings modes - mostly used for mouseover view changes
export const MOUSE_OVER_DOWNHILL = 'MOUSE_OVER_DOWNHILL';
export const MOUSE_OUT_DOWNHILL = 'MOUSE_OUT_DOWNHILL';
export const OPEN_PREFERENCES = 'OPEN_PREFERENCES';
export const CLOSE_PREFERENCES = 'CLOSE_PREFERENCES';
export const OPEN_UPHILL_PREFERENCES = 'OPEN_UPHILL_PREFERENCES';
export const OPEN_DOWNHILL_PREFERENCES = 'OPEN_DOWNHILL_PREFERENCES';
export const OPEN_OTHER_PREFERENCES = 'OPEN_OTHER_PREFERENCES';

// Trip planning options
export const SET_DATE = 'SET_DATE';
export const SET_TIME = 'SET_TIME';
export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_ORIGIN = 'SET_ORIGIN';
export const SET_ORIGIN_DESTINATION = 'SET_ORIGIN_DESTINATION';
export const SWAP_WAYPOINTS = 'SWAP_WAYPOINTS';

// Directions view toggle
export const CLOSE_DIRECTIONS = 'CLOSE_DIRECTIONS';
export const VIEW_DIRECTIONS = 'VIEW_DIRECTIONS';
export const VIEW_ROUTE_INFO = 'VIEW_ROUTE_INFO';

// Map view settings
export const MAP_MOVE = 'MAP_MOVE';
export const SET_CENTER = 'SET_CENTER';
export const SET_CENTER_AND_ZOOM = 'SET_CENTER_AND_ZOOM';
export const SET_POI = 'SET_POI';
export const SET_ZOOM = 'SET_ZOOM';

// Map interactions
export const CLEAR_SELECTED_FEATURES = 'CLEAR_SELECTED_FEATURES';
export const MAP_CLICK = 'MAP_CLICK';

// Geolocation
export const CLEAR_GEOLOCATION = 'CLEAR_GEOLOCATION';
export const NO_GEOLOCATION = 'NO_GEOLOCATION';
export const RECEIVE_GEOLOCATION = 'RECEIVE_GEOLOCATION';
export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION';

// Routing statuses
export const FAILED_ROUTE = 'FAILED_ROUTE';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const REQUEST_ROUTE = 'REQUEST_ROUTE';

// Browser / load events
export const LOAD_APP = 'LOAD_APP';
export const LOAD_MAP = 'LOAD_MAP';
export const RESIZE_MAP = 'RESIZE_MAP';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';

// Logging - track map view info, but isolated to prevent infinite recursion
export const MAP_LOAD = 'MAP_LOAD';

// Drawer toggles
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const HIDE_DRAWER = 'HIDE_DRAWER';

// Authentication
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const GOT_USER = 'GOT_USER';

// Action creators
export const logIn = () => ({ type: LOG_IN });
export const logOut = () => ({ type: LOG_OUT });
export const userLoggedIn = (sub, preferredUsername, idToken, accessToken) => ({
  type: USER_LOGGED_IN,
  payload: { sub, preferredUsername, idToken, accessToken },
  meta: {
    analytics: {
      type: 'user-logged-in',
      payload: {
        preferredUsername,
        sub,
      },
    },
  },
});
export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT,
  meta: {
    analytics: {
      type: 'user-logged-out',
    },
  },
});
export const gotUser = (sub, preferredUsername, idToken, accessToken) => ({
  type: GOT_USER,
  payload: {
    accessToken,
    idToken,
    preferredUsername,
    sub,
  },
});

export const enableAnalytics = () => ({
  type: ENABLE_ANALYTICS,
  meta: {
    analytics: {
      type: 'enable-analytics',
    },
  },
});

export const disableAnalytics = () => ({
  type: DISABLE_ANALYTICS,
  meta: {
    analytics: {
      type: 'disable-analytics',
    },
  },
});

export const addToast = text => ({
  type: ADD_TOAST,
  payload: text,
  meta: {
    analytics: {
      type: 'add-toast',
      payload: text,
    },
  },
});

export const popToast = () => ({
  type: POP_TOAST,
  meta: {
    analytics: {
      type: 'pop-toast',
    },
  },
});

export const clickAboutLink = () => ({
  type: CLICK_ABOUT_LINK,
  meta: {
    analytics: {
      type: 'click-about-link',
    },
  },
});

export const clickContactLink = () => ({
  type: CLICK_CONTACT_LINK,
  meta: {
    analytics: {
      type: 'click-contact-link',
    },
  },
});

export const closeLinkOverlay = () => ({
  type: CLOSE_LINK_OVERLAY,
  meta: {
    analytics: {
      type: 'close-link-overlay',
    },
  },
});

export const toggleTripPlanning = planningTrip => (dispatch, getState) => {
  const { router, waypoints } = getState();
  dispatch({
    type: TOGGLE_TRIP_PLANNING,
    payload: {
      planningTrip,
      poi: waypoints.poi,
    },
    meta: {
      analytics: {
        type: 'toggle-trip-planning',
      },
    },
  });

  const { lon, lat, zoom } = router.route.params;
  const { origin, destination, poi } = waypoints;
  const params = { lon, lat, zoom, origin, destination };

  if (planningTrip) {
    dispatch(router5.navigateTo('root.home.at', params));
  } else {
    if (!origin && poi) {
      params.origin = poi;
    }
    dispatch(router5.navigateTo('root.directions.at', params));
  }
};

export const toggleSettingProfile = displayed => ({
  type: TOGGLE_SETTING_PROFILE,
  payload: displayed,
  meta: {
    analytics: {
      type: 'toggle-setting-profile',
    },
  },
});

export const viewMapInfo = () => ({
  type: VIEW_MAP_INFO,
  meta: {
    analytics: {
      type: 'view-map-info',
    },
  },
});

export const closeMapInfo = () => ({
  type: CLOSE_MAP_INFO,
  meta: {
    analytics: {
      type: 'close-map-info',
    },
  },
});

export const requestRoute = (origin, destination, params) => ({
  type: REQUEST_ROUTE,
  payload: {
    origin,
    destination,
    params,
  },
  meta: {
    analytics: {
      type: 'request-route',
      payload: {
        origin,
        destination,
        params,
      },
    },
  },
});

export const receiveRoute = routeResult => (dispatch, getState) => {
  const { route } = getState().router;

  dispatch({
    type: RECEIVE_ROUTE,
    payload: {
      routeResult,
    },
    meta: {
      analytics: {
        type: 'receive-route',
        payload: {
          routeResult,
        },
      },
    },
  });

  const { params } = route;
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
  dispatch(router5.navigateTo('root.directions.waypoints.at', directionsParams));
};

export const failedRoute = (origin, destination, error) => ({
  type: FAILED_ROUTE,
  payload: {
    origin,
    destination,
    error,
  },
  meta: {
    analytics: {
      type: 'failed-route',
      payload: {
        origin,
        destination,
        error,
      },
    },
  },
});

export const fetchRoute = (origin, destination, params) => (dispatch) => {
  // TODO: acquire state here rather than passing it from previous step
  dispatch(requestRoute(origin, destination, params));

  const {
    inclineMax,
    inclineMin,
    requireCurbRamps,
    speed,
    timeStamp,
  } = params;

  const routeParams = {
    origin: [origin.lat, origin.lon].join(','),
    destination: [destination.lat, destination.lon].join(','),
    incline_max: inclineMax,
    incline_min: inclineMin,
    speed,
    timestamp: timeStamp,
  };
  if (requireCurbRamps) routeParams.avoid = 'curbs';

  const esc = encodeURIComponent;
  const urlQuery = Object.keys(routeParams)
    .map(k => `${esc(k)}=${esc(routeParams[k])}`)
    .join('&');

  const query = `${window.location.origin}/api/v2/route.json?${urlQuery}`;

  fetch(query)
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      },
    )
    .then(json => dispatch(receiveRoute(json)))
    .catch(error => dispatch(failedRoute(origin, destination, error.message)));
};


const routeIfValid = (dispatch, getState) => {
  const state = getState();
  const {
    origin,
    destination,
  } = state.waypoints;

  const {
    inclineMax,
    inclineMin,
    requireCurbRamps,
    speed,
  } = state.profile.profiles[state.profile.selectedProfile];

  const timeStamp = state.routesettings.dateTime;

  if (origin !== null && destination !== null) {
    dispatch(fetchRoute(
      origin,
      destination,
      { inclineMax, inclineMin, requireCurbRamps, speed, timeStamp },
    ));
  }
};

export const toggleCurbRamps = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_CURBRAMPS,
    meta: {
      analytics: {
        type: 'toggle-curbramps',
      },
    },
  });
  routeIfValid(dispatch, getState);
};


export const setInclineMax = value => (dispatch, getState) => {
  dispatch({
    type: SET_INCLINE_MAX,
    payload: value,
    meta: {
      analytics: {
        type: 'set-incline-max',
        payload: {
          value,
        },
      },
    },
  });
  routeIfValid(dispatch, getState);
};

export const setInclineMin = value => (dispatch, getState) => {
  dispatch({
    type: SET_INCLINE_MIN,
    payload: value,
    meta: {
      analytics: {
        type: 'set-incline-min',
        payload: {
          value,
        },
      },
    },
  });
  routeIfValid(dispatch, getState);
};

export const setProfile = profile => (dispatch, getState) => {
  dispatch({
    type: SET_PROFILE,
    payload: profile,
    meta: {
      analytics: {
        type: 'set-profile',
        payload: {
          profile,
        },
      },
    },
  });
  routeIfValid(dispatch, getState);
};

export const setProfileDefault = profile => (dispatch, getState) => {
  dispatch({
    type: SET_PROFILE_DEFAULT,
    payload: profile,
    meta: {
      analytics: {
        type: 'set-profile-default',
        payload: {
          profile,
        },
      },
    },
  });
  routeIfValid(dispatch, getState);
};

export const setOrigin = (lon, lat, name) => (dispatch, getState) => {
  const { log, router, waypoints } = getState();

  dispatch({
    type: SET_ORIGIN,
    payload: { lon, lat, name, bounds: log.bounds },
    meta: {
      analytics: {
        type: 'set-origin',
        payload: { lon, lat, name, bounds: log.bounds },
      },
    },
  });

  routeIfValid(dispatch, getState);

  const { params } = router.route;

  const { destination } = waypoints;
  const origin = { lon, lat, name };

  const waypointsNormalized = [origin, destination];

  const directionsParams = {
    lon: params.lon,
    lat: params.lat,
    zoom: params.zoom,
    waypoints: waypointsNormalized,
  };

  dispatch(router5.navigateTo('root.directions.waypoints.at', directionsParams));
};


export const setDestination = (lon, lat, name) => (dispatch, getState) => {
  const { log, router, waypoints } = getState();

  dispatch({
    type: SET_DESTINATION,
    payload: { lon, lat, name, bounds: log.bounds },
    meta: {
      analytics: {
        type: 'set-destination',
        payload: { lon, lat, name, bounds: log.bounds },
      },
    },
  });

  routeIfValid(dispatch, getState);

  const { params } = router.route;
  const { origin } = waypoints;
  const destination = { lon, lat, name };

  const waypointsNormalized = [origin, destination];

  const directionsParams = {
    lon: params.lon,
    lat: params.lat,
    zoom: params.zoom,
    waypoints: waypointsNormalized,
  };

  dispatch(router5.navigateTo('root.directions.waypoints.at', directionsParams));
};

export const setPOI = (lon, lat, name) => (dispatch, getState) => {
  const { log, router } = getState();

  dispatch({
    type: SET_POI,
    payload: { lon, lat, name, bounds: log.bounds },
    meta: {
      analytics: {
        type: 'set-poi',
        payload: { lon, lat, name },
      },
    },
  });

  if (router.route) {
    const { params } = router.route;
    if (!inView(lon, lat, params.lon, params.lat, params.zoom)) {
      // TODO: put the default POI zoom in the constants module, use here and
      // in reducers.
      const center = centerInView(lon, lat, 16);
      const updatedParams = { ...params, lon: center[0], lat: center[1] };
      const routeName = router.route.name.endsWith('.at') ?
        router.route.name :
        `${router.route.name}.at`;
      dispatch(router5.navigateTo(routeName, updatedParams));
    }
  }
};

export const setOriginDestination = (origin, destination) => (dispatch, getState) => {
  dispatch({
    type: SET_ORIGIN_DESTINATION,
    payload: { origin, destination },
  });
  routeIfValid(dispatch, getState);
};

export const loadApp = () => ({
  type: LOAD_APP,
  meta: {
    analytics: {
      type: 'load-app',
    },
  },
});

export const loadMap = (lon, lat, zoom, bbox) => (dispatch, getState) => {
  // NOTE: Important! LOAD_MAP analytics meta is required for our implementation of
  // rakam js analytics.
  dispatch({
    type: LOAD_MAP,
    payload: {
      bounds: bbox,
    },
    meta: {
      analytics: {
        type: 'load-map',
      },
    },
  });
  const { router } = getState();
  const waypointsRoutes = [
    'root.directions.waypoints',
    'root.directions.waypoints.at',
  ];
  if (router.route && router.route.name === 'root.home') {
    dispatch(router5.navigateTo('root.home.at', { lon, lat, zoom }));
  } else if (router.route && waypointsRoutes.includes(router.route.name)) {
    // Extract params
    const { waypoints } = router.route.params;
    if (waypoints.length > 1) {
      const origin = waypoints[0];
      origin.name = [origin.lat, origin.lon].join(', ');
      const destination = waypoints[1];
      destination.name = [destination.lat, destination.lon].join(', ');
      dispatch(setOriginDestination(origin, destination));
    }
  }
};

export const resizeMap = (width, height) => ({
  type: RESIZE_MAP,
  payload: { width, height },
});

export const swapWaypoints = (origin, destination) => (dispatch, getState) => {
  dispatch({
    type: SWAP_WAYPOINTS,
    payload: {
      origin,
      destination,
    },
    meta: {
      analytics: {
        type: 'swap-waypoints',
        payload: {
          origin,
          destination,
        },
      },
    },
  });
  routeIfValid(dispatch, getState);
};


export const setCenter = center => ({ type: SET_CENTER, payload: center });

export const setZoom = zoom => (dispatch, getState) => {
  dispatch({ type: SET_ZOOM, payload: zoom });

  const { router } = getState();
  const { route } = router;

  if (route !== null) {
    const params = { ...route.params, zoom };
    const routeName = route.name.endsWith('.at') ?
      route.name :
      `${route.name}.at`;
    dispatch(router5.navigateTo(routeName, params));
  }
};


// Useful for when you want to set both: if you just used setCenter and
// setZoom, you can get race conditions due to the map also updating state
// when it's finished zooming/moving
export const setCenterAndZoom = (center, zoom) => ({
  type: SET_CENTER_AND_ZOOM,
  payload: {
    center,
    zoom,
  },
});

export const closeDirections = routeResult => ({
  type: CLOSE_DIRECTIONS,
  payload: routeResult,
  meta: {
    analytics: {
      type: 'close-directions',
    },
  },
});

export const viewDirections = routeResult => ({
  type: VIEW_DIRECTIONS,
  payload: routeResult,
  meta: {
    analytics: {
      type: 'view-directions',
    },
  },
});

export const mapMove = (lon, lat, zoom, bounds) => (dispatch, getState) => {
  dispatch({
    type: MAP_MOVE,
    payload: {
      lon,
      lat,
      zoom,
      bounds,
    },
    meta: {
      analytics: {
        type: 'map-move',
        payload: {
          lon,
          lat,
          zoom,
          bounds,
        },
      },
    },
  });

  const { router } = getState();
  const { route } = router;

  let params;
  let routeName;
  if (route === null) {
    params = { lon, lat, zoom };
    routeName = 'root.home.at';
  } else {
    params = { ...route.params, lon, lat, zoom };
    routeName = route.name.endsWith('.at') ?
      route.name :
      `${route.name}.at`;
  }

  dispatch(router5.navigateTo(routeName, params));
};

export const viewRouteInfo = routeResult => ({
  type: VIEW_ROUTE_INFO,
  payload: routeResult,
  meta: {
    analytics: {
      type: 'view-route-info',
    },
  },
});


export const resizeWindow = () => ({
  type: RESIZE_WINDOW,
  meta: {
    analytics: {
      type: 'resize-window',
    },
  },
});


// TODO: include centerpoint? Gotta know where to show popups!
export const mapClick = (features, location) => ({
  type: MAP_CLICK,
  payload: { features, location },
  meta: {
    analytics: {
      type: 'map-click',
      payload: {
        features,
        location,
      },
    },
  },
});


export const clearSelectedFeatures = () => ({
  type: CLEAR_SELECTED_FEATURES,
  meta: {
    analytics: {
      type: 'clear-selected-features',
    },
  },
});


export const toggleGeolocation = () => (dispatch, getState) => {
  const { geolocation } = getState();
  if (geolocation && geolocation.status === 'Ok') {
    dispatch({ type: CLEAR_GEOLOCATION });
    return;
  }

  const permissions = navigator.permissions.query({ name: 'geolocation' });
  permissions.then((p) => {
    switch (p.state) {
      case 'granted':
      case 'prompt': {
        dispatch({ type: REQUEST_GEOLOCATION });

        const success = (position) => {
          const coordinates = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          dispatch({
            type: RECEIVE_GEOLOCATION,
            payload: {
              coordinates,
              accuracy: position.coords.accuracy,
            },
          });
        };

        const error = () => {
          // Failed - browser failed to get location
          dispatch({ type: NO_GEOLOCATION });
        };

        navigator.geolocation.getCurrentPosition(success, error);
        break;
      }
      case 'denied':
      default:
        dispatch({ type: NO_GEOLOCATION });
    }
  });
};

export const setDate = (year, month, date) => (dispatch, getState) => {
  dispatch({
    type: SET_DATE,
    payload: { year, month, date },
  });

  routeIfValid(dispatch, getState);
};

export const setTime = (hours, minutes) => (dispatch, getState) => {
  dispatch({
    type: SET_TIME,
    payload: { hours, minutes },
  });

  routeIfValid(dispatch, getState);
};

export const mouseOverDownhill = () => ({
  type: MOUSE_OVER_DOWNHILL,
  meta: {
    analytics: {
      type: 'mouse-over-downhill',
    },
  },
});

export const mouseOutDownhill = () => ({
  type: MOUSE_OUT_DOWNHILL,
  meta: {
    analytics: {
      type: 'mouse-out-downhill',
    },
  },
});

export const openPreferences = () => ({
  type: OPEN_PREFERENCES,
  meta: {
    analytics: {
      type: 'open-preferences',
    },
  },
});

export const closePreferences = () => ({
  type: CLOSE_PREFERENCES,
  meta: {
    analytics: {
      type: 'close-preferences',
    },
  },
});

export const openUphillPreferences = () => ({
  type: OPEN_UPHILL_PREFERENCES,
  meta: {
    analytics: {
      type: 'open-uphill-preferences',
    },
  },
});

export const openDownhillPreferences = () => ({
  type: OPEN_DOWNHILL_PREFERENCES,
  meta: {
    analytics: {
      type: 'open-downhill-preferences',
    },
  },
});

export const openOtherPreferences = () => ({
  type: OPEN_OTHER_PREFERENCES,
  meta: {
    analytics: {
      type: 'open-other-preferences',
    },
  },
});

export const showDrawer = () => ({
  type: SHOW_DRAWER,
});

export const hideDrawer = () => ({
  type: HIDE_DRAWER,
});
