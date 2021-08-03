import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  loaded: boolean;
}

const initialState = {
  loaded: false,
} as AppState;

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    load(state) {
      state.loaded = true;
    },
  },
});

export const { load } = appSlice.actions;
export default appSlice.reducer;
