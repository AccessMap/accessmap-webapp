// Action types

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

// Drawer toggles
export const SHOW_DRAWER = 'SHOW_DRAWER';
export const HIDE_DRAWER = 'HIDE_DRAWER';

// Authentication
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const GOT_USER = 'GOT_USER';

// Tour
export const COMPLETED_TOUR = 'COMPLETED_TOUR';
export const ENABLE_TOUR = 'ENABLE_TOUR';
export const DISABLE_TOUR = 'DISABLE_TOUR';

// Action creators
export const completedTour = () => ({ type: COMPLETED_TOUR });
export const disableTour = () => ({ type: DISABLE_TOUR });
export const enableTour = () => ({ type: ENABLE_TOUR });

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

export const toggleTripPlanning = planningTrip => ({
  type: TOGGLE_TRIP_PLANNING,
  payload: {
    planningTrip,
  },
  meta: {
    analytics: {
      type: 'toggle-trip-planning',
    },
  },
});

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

export const receiveRoute = routeResult => ({
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
  dispatch({
    type: SET_ORIGIN,
    payload: { lon, lat, name },
    meta: {
      analytics: {
        type: 'set-origin',
        payload: { lon, lat, name },
      },
    },
  });

  routeIfValid(dispatch, getState);
};


export const setDestination = (lon, lat, name) => (dispatch, getState) => {
  dispatch({
    type: SET_DESTINATION,
    payload: { lon, lat, name },
    meta: {
      analytics: {
        type: 'set-destination',
        payload: { lon, lat, name },
      },
    },
  });

  routeIfValid(dispatch, getState);
};

export const setPOI = (lon, lat, name) => ({
  type: SET_POI,
  payload: { lon, lat, name },
  meta: {
    analytics: {
      type: 'set-poi',
      payload: { lon, lat, name },
    },
  },
});

export const setOriginDestination = (origin, destination) => (dispatch, getState) => {
  dispatch({
    type: SET_ORIGIN_DESTINATION,
    payload: { origin, destination },
  });
  routeIfValid(dispatch, getState);
};

export const loadApp = () => ({
  // NOTE: Important! LOAD_APP analytics meta is required for our implementation of
  // rakam js analytics.
  type: LOAD_APP,
  meta: {
    analytics: {
      type: 'load-app',
    },
  },
});

export const loadMap = (lon, lat, zoom, bbox) => ({
  type: LOAD_MAP,
  payload: {
    bounds: bbox,
    lon,
    lat,
    zoom,
  },
  meta: {
    analytics: {
      type: 'load-map',
    },
  },
});

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

export const setZoom = zoom => ({ type: SET_ZOOM, payload: zoom });

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

export const mapMove = (lon, lat, zoom, bounds) => ({
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
