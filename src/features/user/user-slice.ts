import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

import { load as loadApp } from "features/app/app-slice";

export interface UserState {
  signingUp: boolean;
  isLoggedIn: boolean;
  accessToken: string;
  displayName: string;
  refreshToken: string;
  sub: string;
}

const initialState = {
  signingUp: false,
  isLoggedIn: false,
  accessToken: null,
  displayName: null,
  refreshToken: null,
  sub: null,
} as UserState;

const setStateFromAccessToken = (state, accessToken): void => {
  state.accessToken = accessToken;
  state.isLoggedIn = true;
  const decoded = jwtDecode(accessToken);
  state.displayName = decoded.user_claims.display_name;
  state.sub = decoded.sub;
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
      setStateFromAccessToken(state, action.payload.accessToken);
      state.refreshToken = action.payload.refreshToken;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.displayName = null;
      state.sub = null;
      state.refreshToken = null;
    },
    openSignupPrompt(state) {
      state.signingUp = true;
    },
    closeSignupPrompt(state) {
      state.signingUp = false;
    },
    requestAuthentication(state) {
      window.location.href = "/api/v1/auth/login";
    },
    refreshTokenFailure(state) {
      state.isLoggedIn = false;
    },
    refreshTokenSuccess(state, action) {
      setStateFromAccessToken(state, action.payload.accessToken);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadApp, (state) => {
      // App has just loaded! Check if login credentials are in the URL, save
      // them, and change the url
      const paramString = window.location.href.split("?")[1];
      const queryParams = new URLSearchParams(paramString);
      const refreshToken = queryParams.get("refresh_token");
      const accessToken = queryParams.get("access_token");
      if (refreshToken !== null && accessToken !== null) {
        // Update state (logged in!)
        setStateFromAccessToken(state, accessToken);
        state.refreshToken = refreshToken;

        // Return the URL to the default view
        window.history.pushState(null, null, `//${window.location.host}`);
      } else {
        if (state.refreshToken !== null && state.accessToken !== null) {
          setStateFromAccessToken(state, state.accessToken);
        }
      }
    });
  },
});

export const {
  logIn,
  logOut,
  openSignupPrompt,
  closeSignupPrompt,
  requestAuthentication,
  refreshTokenFailure,
  refreshTokenSuccess,
} = userSlice.actions;
export default userSlice.reducer;
