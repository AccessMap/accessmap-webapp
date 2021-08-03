import { createSlice } from "@reduxjs/toolkit";

export interface GeocodersState {}

const initialState = {} as GeocodersState;

const geocodersSlice = createSlice({
  name: "geocoders",
  initialState,
  reducers: {
    searchGeocode(state, action) {},
  },
});

export const { searchGeocode } = geocodersSlice.actions;
export default geocodersSlice.reducer;
