import { createSlice } from "@reduxjs/toolkit";

export interface TourState {
  enabled: boolean;
  tips: boolean;
}

const initialState = {
  enabled: false,
  tips: false,
} as TourState;

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    enable(state) {
      state.enabled = true;
    },
    disable(state) {
      state.enabled = false;
    },
    complete(state) {
      state.enabled = false;
    },
  },
});

export const { enable, disable, complete } = tourSlice.actions;
export default tourSlice.reducer;
