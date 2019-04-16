import {
  AUTHENTICATION_REQUEST,
  LOAD_APP,
  LOG_OUT,
  fetchProfileRequest,
  fetchProfileFailure,
  fetchProfileSuccess,
  logIn,
  logOut,
  noSavedProfiles,
  refreshTokenRequest,
  refreshTokenFailure,
  refreshTokenSuccess
} from "actions";

import { loadUser, loadProfile, refresh } from "../utils/api";

const createAuthMiddleware = () => {
  /* eslint-disable no-unused-vars */
  const middleware = store => next => action => {
    /* eslint-enable no-unused-vars */
    switch (action.type) {
      case LOAD_APP: {
        // TODO: make every API interaction call refresh() and/or put on a timer.
        // TODO: Create an auth manager class to handle these things.
        // When app loads, check for user info / auth status, refresh if necessary
        const { accessToken, refreshToken } = store.getState().auth;
        if (!accessToken) break;
        // We have an accessToken - let's try to use it by loading the current user.
        loadUser(accessToken, err => {
          if (err) {
            // Failed to load user. Get new JWT using refresh token
            // TODO: actually check that it's really a JWT error
            next(refreshTokenRequest());
            if (!refreshToken) return;
            refresh(refreshToken, (err, newAccessToken) => {
              if (err) {
                next(refreshTokenFailure());
              } else {
                next(refreshTokenSuccess(newAccessToken));
                loadProfile(newAccessToken, (err, profile) => {
                  if (err) return next(fetchProfileFailure(err));
                  if (profile) {
                    const profileParams = {
                      uphillMax: profile.uphill_max,
                      downhillMax: profile.downhill_max,
                      avoidCurbs: profile.avoid_curbs
                    };
                    next(fetchProfileSuccess(profileParams));
                  } else {
                    next(noSavedProfiles());
                  }
                });
              }
            });
          } else {
            // User was loaded - our accessToken is good
            loadProfile(accessToken, (err, profile) => {
              if (err) {
                next(fetchProfileFailure(err));
              } else if (profile) {
                const profileParams = {
                  uphillMax: profile.uphill_max,
                  downhillMax: profile.downhill_max,
                  avoidCurbs: profile.avoid_curbs
                };
                next(fetchProfileSuccess(profileParams));
              } else {
                next(noSavedProfiles());
              }
            });
          }
        });
        break;
      }
      case AUTHENTICATION_REQUEST:
        window.location = "/api/v1/auth/login";
        break;
      case LOG_OUT:
        // TODO: logout doesn't really do anything - just clears internal data. User
        // is NOT logged out of OpenStreetMap.
        next(logOut());
        break;
      case "@@router5/TRANSITION_SUCCESS": {
        // TODO: catch errors
        if (action.payload.route.name === "login_callback") {
          const { access_token, refresh_token } = action.payload.route.params;
          // Log in callback - capture access token(s) and redirect.
          // TODO: Save "last location" in localStorage and redirect there.
          // TODO: Just send a new action and let reducers / thunk handle this
          next(logIn(access_token, refresh_token));
          // FIXME: this is a race condition - fetch profile in logIn action
          next(fetchProfileRequest());
        } else if (action.payload.route.name === "signin") {
          // Check for user credentials and redirect to appropriate location
          const { accessToken, refreshToken } = store.getState().auth;
          loadUser(accessToken, err => {
            if (err) {
              // Failed to load user. Attempt to get new JWT using refresh token.
              if (!refreshToken) {
                // TODO: use a less awkward redirect.
                // No refresh token - user must log in
                window.location = "/api/v1/auth/login";
              }
              next(refreshTokenRequest());
              refresh(refreshToken, (err, newAccessToken) => {
                if (err) {
                  // Refresh token is bad / otherwise failed. Need a fresh login.
                  window.location = "/api/v1/auth/login";
                } else {
                  // Refresh token worked - fire login
                  next(logIn(newAccessToken, refresh_token));
                }
              });
            } else {
              // User was successfully loaded. All is well - redirect to main site.
              window.location = "/";
            }
          });
        }
        break;
      }
      default: {
        // FIXME: Check if the user is already logged in (from cached state)
        break;
      }
    }
    next(action);
  };

  return middleware;
};

export default createAuthMiddleware;
