import { createSlice } from "@reduxjs/toolkit";

import bbox from "@turf/bbox";

import regions, { defaultRegion } from "constants/regions";

export interface RegionState {
  key: string;
  name: string;
  bounds: [number, number, number, number];
  selecting: boolean;
}

const initialState = {
  key: defaultRegion.properties.id,
  name: defaultRegion.properties.name,
  bounds: bbox(defaultRegion.geometry),
  selecting: false,
} as RegionState;

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    set(state, action) {
      const key = action.payload;
      const region = regions.features.find(
        (feature) => feature.properties.id === key
      );
      state.name = region.properties.name;
      const box = bbox(region.geometry);
      state.bounds[0] = box[0];
      state.bounds[1] = box[1];
      state.bounds[2] = box[2];
      state.bounds[3] = box[3];
    },
    startSelecting(state) {
      state.selecting = true;
    },
    endSelecting(state) {
      state.selecting = false;
    },
  },
});

export const { set, startSelecting, endSelecting } = regionSlice.actions;
export default regionSlice.reducer;
