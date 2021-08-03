import { createSlice } from "@reduxjs/toolkit";

import regions, { defaultRegion } from "constants/regions";

export interface RegionState {
  key: string;
  name: string;
  bounds: [number, number, number, number];
  selecting: boolean;
}

const initialState = {
  key: defaultRegion.properties.key,
  name: defaultRegion.properties.name,
  bounds: defaultRegion.properties.bounds,
  selecting: false,
} as RegionState;

const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    set(state, action) {
      const key = action.payload;
      const region = regions.features.find(
        (feature) => feature.properties.key === key
      );
      state.name = region.properties.name;
      state.bounds = [
        region.properties.bounds[0],
        region.properties.bounds[1],
        region.properties.bounds[2],
        region.properties.bounds[3],
      ];
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
