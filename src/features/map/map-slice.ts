import { createSlice } from "@reduxjs/toolkit";

import { Media, Orientation } from "types";
import regions, { defaultRegion } from "constants/regions";

import { requestDirections } from "features/directions/directions-slice";
import { editProfile } from "features/profiles/profiles-slice";
import { searchGeocode } from "features/geocoders/geocoders-slice";
import {
  updateMediaType,
  setOrientation,
} from "features/browser/browser-slice";
import { set as setRegion } from "features/region/region-slice";

import routeBounds from "utils/route-bounds";
import getMediaType from "utils/media-type";
import getOrientation from "utils/get-orientation";
import recenterOnVisibleRegion, {
  MapView,
} from "utils/recenter-on-visible-region";
import recenterOnVisibleRegionBounds from "utils/recenter-on-visible-region-bounds";

export interface MapState {
  loaded: boolean;
  lon: number;
  lat: number;
  zoom: number;
  transitionDuration: number;
  bounds?: [number, number, number, number];
  canvasWidth: number;
  canvasHeight: number;
  interactiveWidth: number;
  interactiveHeight: number;
  uphillMode: boolean;
  tasksMode: boolean;
  mediaType: Media;
  orientation: Orientation;
}

const initialState = {
  loaded: false,
  lon: defaultRegion.properties.lon,
  lat: defaultRegion.properties.lat,
  zoom: defaultRegion.properties.zoom,
  transitionDuration: 0,
  canvasWidth: null,
  canvasHeight: null,
  uphillMode: true,
  tasksMode: false,
  mediaType: getMediaType(),
  orientation: getOrientation(),
} as MapState;

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    click(state, action) {},
    move(state, action) {
      state.lon = action.payload.lon;
      state.lat = action.payload.lat;
      state.zoom = action.payload.zoom;
      state.transitionDuration = action.payload.transitionDuration;
      state.bounds = action.payload.bounds;
    },
    moveEnd(state) {
      // This action is only used for logging / analytics
    },
    zoom(state, action) {
      state.zoom = action.payload;
      state.transitionDuration = 500;
    },
    resize(state, action) {
      state.canvasWidth = action.payload.canvasWidth;
      state.canvasHeight = action.payload.canvasHeight;
    },
    load(state, action) {
      // Mark map as loaded
      state.loaded = true;
    },
    mouseOverDownhill(state) {
      state.uphillMode = false;
    },
    mouseOutDownhill(state) {
      state.uphillMode = true;
    },
    clickMapLegendButton(state) {},
    clickMapLegendCloseButton(state) {},
    clickTasksModeButton(state) {
      state.tasksMode = !state.tasksMode;
    },
  },
  extraReducers: (builder) => {
    // TODO: tracking of media type and orientation is duplicated here and in
    // the browser feature. Find way to consolidate?
    builder.addCase(updateMediaType, (state, action) => {
      state.mediaType = getMediaType();
    });
    builder.addCase(setOrientation, (state, action) => {
      state.orientation = action.payload;
    });
    builder.addCase(editProfile, (state, action) => {
      if (action.payload === "DOWNHILL") {
        state.uphillMode = false;
      } else {
        state.uphillMode = true;
      }
    });
    builder.addCase(setRegion, (state, action) => {
      const key = action.payload;
      const region = regions.features.find(
        (feature) => feature.properties.id === key
      );

      state.lon = region.properties.lon;
      state.lat = region.properties.lat;
      state.zoom = region.properties.zoom;
      state.transitionDuration = 1000;
    });
    builder.addCase(requestDirections.fulfilled, (state, action) => {
      const bounds = routeBounds(action.payload);
      // Add an extra bottom margin in anticipation of a 'directions card' in
      // that location.
      let addMargins = {
        bottom: 128,
        top: 0,
        left: 0,
        right: 0,
      };

      // If we're in landscape mobile, the directions card is off to the left
      // under the omnicard and we don't need to change any margins.
      if (state.mediaType === "mobile" && state.orientation === "landscape") {
        addMargins = {
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
        };
      }
      const mapView: MapView = recenterOnVisibleRegionBounds(
        bounds,
        state.canvasWidth,
        state.canvasHeight,
        state.mediaType,
        state.orientation,
        addMargins
      );
      state.lon = mapView.lon;
      state.lat = mapView.lat;
      state.zoom = mapView.zoom;
      state.bounds = bounds;
      state.transitionDuration = 1000;
    });
    builder.addCase(searchGeocode, (state, action) => {
      const geocodeZoom = state.mediaType === "mobile" ? 16 : 17;
      const mapView: MapView = recenterOnVisibleRegion(
        action.payload.lon,
        action.payload.lat,
        geocodeZoom,
        state.canvasWidth,
        state.canvasHeight,
        state.mediaType,
        state.orientation
      );
      state.lon = mapView.lon;
      state.lat = mapView.lat;
      state.zoom = mapView.zoom;
      state.bounds = mapView.bounds;
      state.transitionDuration = 1000;
    });
  },
});

export const {
  move,
  moveEnd,
  click,
  zoom,
  load,
  mouseOverDownhill,
  mouseOutDownhill,
  resize,
  clickMapLegendButton,
  clickMapLegendCloseButton,
  clickTasksModeButton,
} = mapSlice.actions;
export default mapSlice.reducer;
