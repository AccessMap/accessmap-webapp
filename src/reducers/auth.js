import jwtDecode from "jwt-decode";
import { combineReducers } from "redux";

import { LOG_IN, LOG_OUT, REFRESH_TOKEN_SUCCESS } from "actions";

import { defaultAuth as defaults } from "reducers/defaults";

const handleSub = (state = defaults.sub, action) => {
  switch (action.type) {
    case LOG_IN:
      return jwtDecode(action.payload.accessToken).sub;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

const handleDisplayName = (state = defaults.displayName, action) => {
  switch (action.type) {
    case LOG_IN: {
      return jwtDecode(action.payload.accessToken).user_claims.display_name;
    }
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

const handleAccessToken = (state = defaults.accessToken, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload.accessToken;
    case LOG_OUT:
      return null;
    case REFRESH_TOKEN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const handleRefreshToken = (state = defaults.refreshToken, action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload.refreshToken;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

const handleIsLoggedIn = (state = defaults.isLoggedIn, action) => {
  switch (action.type) {
    case LOG_IN:
      return true;
    case LOG_OUT:
      return false;
    case REFRESH_TOKEN_SUCCESS:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  sub: handleSub,
  displayName: handleDisplayName,
  accessToken: handleAccessToken,
  refreshToken: handleRefreshToken,
  isLoggedIn: handleIsLoggedIn
});
