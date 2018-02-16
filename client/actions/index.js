// Action types

// Link clicks
export const CLICK_ABOUT_LINK = 'CLICK_ABOUT_LINK';
export const CLICK_CONTACT_LINK = 'CLICK_CONTACT_LINK';
export const CLOSE_LINK_OVERLAY = 'CLOSE_LINK_OVERLAY';

// Direct activity changes
export const TOGGLE_TRIP_PLANNING = 'TOGGLE_TRIP_PLANNING';
export const TOGGLE_SETTING_PROFILE = 'TOGGLE_SETTING_PROFILE';

// Routing profile settings
export const SET_SPEED = 'SET_SPEED';
export const SET_INCLINE_MAX = 'SET_INCLINE_MAX';
export const SET_INCLINE_MIN = 'SET_INCLINE_MIN';
export const SET_PROFILE = 'SET_PROFILE';
export const TOGGLE_CURBRAMPS = 'TOGGLE_CURBRAMPS';

// Settings modes - mostly used for mouseover view changes
export const MOUSE_OVER_DOWNHILL = 'MOUSE_OVER_DOWNHILL';
export const MOUSE_OUT_DOWNHILL = 'MOUSE_OUT_DOWNHILL';
export const OPEN_PREFERENCES = 'OPEN_PREFERENCES';
export const CLOSE_PREFERENCES = 'CLOSE_PREFERENCES';
export const OPEN_UPHILL_PREFERENCES = 'OPEN_UPHILL_PREFERENCES';
export const OPEN_DOWNHILL_PREFERENCES = 'OPEN_DOWNHILL_PREFERENCES';
export const OPEN_OTHER_PREFERENCES = 'OPEN_OTHER_PREFERENCES';

// User geocoding actions (typing into search bars)
export const SET_DESTINATION_TEXT = 'SET_DESTINATION_TEXT';
export const SET_ORIGIN_TEXT = 'SET_ORIGIN_TEXT';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

// Map POIs
export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_ORIGIN = 'SET_ORIGIN';
export const SET_ORIGIN_DESTINATION = 'SET_ORIGIN_DESTINATION';
export const SET_POI = 'SET_POI';
export const SWAP_WAYPOINTS = 'SWAP_WAYPOINTS';

// Map view settings
export const SET_CENTER = 'SET_CENTER';
export const SET_ZOOM = 'SET_ZOOM';
export const SET_CENTER_AND_ZOOM = 'SET_CENTER_AND_ZOOM';
export const MAP_MOVE = 'MAP_MOVE';

// Map interactions
export const CLEAR_SELECTED_FEATURES = 'CLEAR_SELECTED_FEATURES';
export const MAP_CLICK = 'MAP_CLICK';
export const MAP_CONTEXT_CLICK = 'MAP_CONTEXT_CLICK';
export const CANCEL_CONTEXT = 'CANCEL_CONTEXT';

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

// Logging - track data, doesn't impact rendering
export const LOG_BOUNDS = 'LOG_BOUNDS';

// Action creators
export function clickAboutLink() {
  return {
    type: CLICK_ABOUT_LINK,
    meta: {
      analytics: {
        type: 'click-about-link',
      }
    }
  };
}

export function clickContactLink() {
  return {
    type: CLICK_CONTACT_LINK,
    meta: {
      analytics: {
        type: 'click-contact-link',
      }
    }
  };
}

export function closeLinkOverlay() {
  return {
    type: CLOSE_LINK_OVERLAY,
    meta: {
      analytics: {
        type: 'close-link-overlay',
      }
    }
  };
}

export function toggleTripPlanning(planningTrip) {
  return (dispatch, getState) => {
    const {waypoints} = getState();
    dispatch({
      type: TOGGLE_TRIP_PLANNING,
      payload: {
        planningTrip,
        poi: waypoints.poi,
      },
      meta: {
        analytics: {
          type: 'toggle-trip-planning',
        }
      }
    });
  };
}

export function toggleSettingProfile(displayed) {
  return {
    type: TOGGLE_SETTING_PROFILE,
    payload: displayed,
    meta: {
      analytics: {
        type: 'toggle-setting-profile',
      }
    }
  };
}

export function requestRoute(origin, destination, params) {
  return {
    type: REQUEST_ROUTE,
    payload: {
      origin,
      destination,
      params
    },
    meta: {
      analytics: {
        type: 'request-route',
        payload: {
          origin,
          destination,
          params
        }
      }
    }
  };
}

export function receiveRoute(routeResult, mediaType) {
  return {
    type: RECEIVE_ROUTE,
    payload: {
      routeResult,
      mediaType,
    },
    meta: {
      analytics: {
        type: 'receive-route',
        payload: {
          routeResult,
          mediaType,
        }
      }
    }
  };
}

export function failedRoute(origin, destination, error) {
  return {
    type: FAILED_ROUTE,
    payload: {
      origin,
      destination,
      error
    },
    meta: {
      analytics: {
        type: 'failed-route',
        payload: {
          origin,
          destination,
          error
        }
      }
    }
  };
}

export function fetchRoute(origin, destination, params, mediaType) {
  return (dispatch) => {
    dispatch(requestRoute(origin, destination, params));

    const {
      inclineMax,
      inclineMin,
      requireCurbRamps,
      speed,
    } = params;

    const routeParams = {
      origin: origin.geometry.coordinates.slice().reverse().join(','),
      destination: destination
                     .geometry
                     .coordinates
                     .slice()
                     .reverse()
                     .join(','),
      incline_max: inclineMax,
      incline_min: inclineMin,
      speed: speed,
    };
    if (requireCurbRamps) routeParams.avoid = 'curbs';

    const esc = encodeURIComponent;
    const urlQuery = Object.keys(routeParams)
      .map(k => `${esc(k)}=${esc(routeParams[k])}`)
      .join('&');

    const query = `${window.location.origin}/api/v2/route.json?${urlQuery}`;

    fetch(query)
      .then(
        response => response.json(),
        error => dispatch(failedRoute, origin, destination, error)
      )
      .then(json => dispatch(receiveRoute(json, mediaType)));
  };
}

function routeIfValid(dispatch, getState) {
  const state = getState();
  const {
    origin,
    destination
  } = state.waypoints;

  const {
    planningTrip,
  } = state.activities;

  const {
    inclineMax,
    inclineMin,
    requireCurbRamps,
    speed,
  } = state.routingprofile;

  const {
    mediaType,
  } = state.browser;

  if (planningTrip && origin !== null && destination !== null) {
    dispatch(fetchRoute(
      origin,
      destination,
      { inclineMax, inclineMin, requireCurbRamps, speed },
      mediaType,
    ));
  }
}

export function toggleCurbRamps() {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_CURBRAMPS,
      meta: {
        analytics: {
          type: 'toggle-curbramps',
        }
      }
    });
    routeIfValid(dispatch, getState);
  };
}

export function setInclineMax(value) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_INCLINE_MAX,
      payload: value,
      meta: {
        analytics: {
          type: 'set-incline-max',
          payload: {
            value
          }
        }
      }
    });
    routeIfValid(dispatch, getState);
  };
}

export function setInclineMin(value) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_INCLINE_MIN,
      payload: value,
      meta: {
        analytics: {
          type: 'set-incline-min',
          payload: {
            value
          }
        }
      }
    });
    routeIfValid(dispatch, getState);
  };
}

export function setProfile(profile) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PROFILE,
      payload: profile,
      meta: {
        analytics: {
          type: 'set-profile',
          payload: {
            profile
          },
        }
      }
    });
    routeIfValid(dispatch, getState);
  };
}

export function setOrigin(lng, lat, name) {
  return (dispatch, getState) => {
    const { log } = getState();

    dispatch({
      type: SET_ORIGIN,
      payload: { lng, lat, name, bounds: log.bounds },
      meta: {
        analytics: {
          type: 'set-origin',
          payload: { lng, lat, name, bounds: log.bounds },
        }
      }
    });

    routeIfValid(dispatch, getState);
  };
}

export function setDestination(lng, lat, name) {
  return (dispatch, getState) => {
    const { log } = getState();

    dispatch({
      type: SET_DESTINATION,
      payload: { lng, lat, name, bounds: log.bounds },
      meta: {
        analytics: {
          type: 'set-destination',
          payload: { lng, lat, name, bounds: log.bounds },
        }
      }
    });

    routeIfValid(dispatch, getState);
  };
}

export function setPOI(lng, lat, name) {
  return (dispatch, getState) => {
    const { log } = getState();

    dispatch({
      type: SET_POI,
      payload: { lng, lat, name, bounds: log.bounds },
      meta: {
        analytics: {
          type: 'set-poi',
          payload: { lng, lat, name },
        }
      }
    });
  }
}

export function loadApp() {
  return {
    type: LOAD_APP,
  };
}

export function loadMap(width, height) {
  return {
    type: LOAD_MAP,
    payload: {
      width,
      height,
    }
  };
}

export function resizeMap(width, height) {
  return {
    type: RESIZE_MAP,
    payload: { width, height },
  };
}

export function logBounds(bounds) {
  return (dispatch, getState) => {
    // Ignore when the map hasn't really moved - this event fires
    // a ton at random times, even without map changes.
    // (Since JavaScript == doesn't really work for arrays, gotta
    // iterate)
    const stateBounds = getState().log.bounds;
    if (stateBounds) {
      let bboxEqual = true;
      for (let i = 0; i < bounds.length; i++) {
        if (bounds[i] != stateBounds[i]) {
          bboxEqual = false;
        }
      }
      if (bboxEqual) return;
    }

    dispatch({
      type: LOG_BOUNDS,
      payload: bounds,
      meta: {
        analytics: {
          type: 'log-bounds',
          payload: {
            bounds
          }
        }
      }
    });
  }
}

export function setOriginDestination(originLat, originLon, originName, destLat, destLon, destName) {
  return {
    type: SET_ORIGIN_DESTINATION,
    payload: {
      originLat,
      originLon,
      originName,
      destLat,
      destLon,
      destName,
    }
  };
}

export function swapWaypoints(origin, destination) {
  return (dispatch, getState) => {
    dispatch({
      type: SWAP_WAYPOINTS,
      payload: {
        origin,
        destination
      },
      meta: {
        analytics: {
          type: 'swap-waypoints',
          payload: {
            origin,
            destination
          }
        }
      }
    });
    routeIfValid(dispatch, getState);
  };
}

export function setCenter(center) {
  return {
    type: SET_CENTER,
    payload: center
  };
}

export function setZoom(zoom) {
  return {
    type: SET_ZOOM,
    payload: zoom
  };
}

export function setCenterAndZoom(center, zoom) {
  // Useful for when you want to set both: if you just used setCenter and
  // setZoom, you can get race conditions due to the map also updating state
  // when it's finished zooming/moving
  return {
    type: SET_CENTER_AND_ZOOM,
    payload: {
      center,
      zoom
    }
  };
}

export function mapMove(center, zoom, bounds) {
  return {
    type: MAP_MOVE,
    payload: {
      center,
      zoom,
      bounds
    },
    meta: {
      analytics: {
        type: 'map-move',
        payload: {
          center,
          zoom,
          bounds
        }
      }
    }
  };
}

export function resizeWindow() {
  return {
    type: RESIZE_WINDOW,
    meta: {
      analytics: {
        type: 'resize-window',
      }
    }
  };
}

// TODO: include centerpoint? Gotta know where to show popups!
export function mapClick(features) {
  return {
    type: MAP_CLICK,
    payload: features,
    meta: {
      analytics: {
        type: 'map-click',
        payload: {
          features
        }
      }
    }
  };
}

export function clearSelectedFeatures() {
  return {
    type: CLEAR_SELECTED_FEATURES,
    meta: {
      analytics: {
        type: 'clear-selected-features'
      }
    }
  };
}

export function mapContextClick(lng, lat) {
  return {
    type: MAP_CONTEXT_CLICK,
    payload: {
      lng,
      lat
    },
    meta: {
      analytics: {
        type: 'map-context-click',
        payload: {
          lng,
          lat
        }
      }
    }
  };
}

export function cancelContext() {
  return {
    type: CANCEL_CONTEXT,
    meta: {
      analytics: {
        type: 'cancel-context',
      }
    }
  }
}

export function toggleGeolocation() {
  return (dispatch, getState) => {
    const { geolocation } = getState().geolocation;
    if (geolocation && geolocation.status === 'Ok') {
      dispatch({ type: 'CLEAR_GEOLOCATION' });
      return;
    }

    if ('geolocation' in navigator) {
      // Try to get the geolocation
      dispatch({ type: 'REQUEST_GEOLOCATION' });
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = [
          position.coords.longitude,
          position.coords.latitude
        ];
        dispatch({
          type: 'RECEIVE_GEOLOCATION',
          payload: {
            coordinates,
            accuracy: position.coords.accuracy
          }
        });
      });
    } else {
      // Fail
      dispatch({ type: 'NO_GEOLOCATION' });
    }
  };
}

export function setSearchText(text) {
  return {
    type: SET_SEARCH_TEXT,
    payload: text
  }
}

export function setOriginText(text) {
  return {
    type: SET_ORIGIN_TEXT,
    payload: text
  }
}

export function setDestinationText(text) {
  return {
    type: SET_DESTINATION_TEXT,
    payload: text
  }
}

export function mouseOverDownhill() {
  return {
    type: MOUSE_OVER_DOWNHILL,
    meta: {
      analytics: {
        type: 'mouse-over-downhill'
      }
    }
  }
}

export function mouseOutDownhill() {
  return {
    type: MOUSE_OUT_DOWNHILL,
    meta: {
      analytics: {
        type: 'mouse-out-downhill'
      }
    }
  }
}

export function openPreferences() {
  return {
    type: OPEN_PREFERENCES,
    meta: {
      analytics: {
        type: 'open-preferences'
      }
    }
  };
}

export function closePreferences() {
  return {
    type: CLOSE_PREFERENCES,
    meta: {
      analytics: {
        type: 'close-preferences'
      }
    }
  };
}

export function openUphillPreferences() {
  return {
    type: OPEN_UPHILL_PREFERENCES,
    meta: {
      analytics: {
        type: 'open-uphill-preferences'
      }
    }
  };
}

export function openDownhillPreferences() {
  return {
    type: OPEN_DOWNHILL_PREFERENCES,
    meta: {
      analytics: {
        type: 'open-downhill-preferences'
      }
    }
  };
}

export function openOtherPreferences() {
  return {
    type: OPEN_OTHER_PREFERENCES,
    meta: {
      analytics: {
        type: 'open-other-preferences'
      }
    }
  };
}
