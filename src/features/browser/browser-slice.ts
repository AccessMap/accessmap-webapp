import { createSlice } from "@reduxjs/toolkit";

import { Media, Orientation } from "types";
import getMediaType from "utils/media-type";
import getOrientation from "utils/get-orientation";

export interface BrowserState {
  mediaType: Media;
  orientation: Orientation;
}

const initialState = {
  mediaType: getMediaType(),
  orientation: getOrientation(),
} as BrowserState;

const browserSlice = createSlice({
  name: "browser",
  initialState,
  reducers: {
    updateMediaType(state) {
      state.mediaType = getMediaType();
    },
    setOrientation(state, action) {
      state.orientation = action.payload;
    },
  },
});

export const { updateMediaType, setOrientation } = browserSlice.actions;
export default browserSlice.reducer;
