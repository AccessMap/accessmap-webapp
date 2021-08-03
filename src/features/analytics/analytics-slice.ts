import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE, RehydrateAction } from "redux-persist";

interface RehydratedStateAction extends RehydrateAction {
  payload: {
    accessToken?: string;
    refreshToken?: string;
    enabled?: boolean;
  };
}

export interface AnalyticsState {
  enabled: boolean;
}

const initialState = { enabled: true } as AnalyticsState;

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    enable(state) {
      state.enabled = true;
    },
    disable(state) {
      state.enabled = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action: RehydratedStateAction) => {
      // redux-persist is rehydrating some state. Check for auth key and
      // attempt to use the refresh token to obtain credentials, etc.
      if (action.key !== "analytics") return;
      if (action.payload?.enabled) {
        state.enabled = action.payload.enabled;
      }
    });
  },
});

export const { enable, disable } = analyticsSlice.actions;
export default analyticsSlice.reducer;
