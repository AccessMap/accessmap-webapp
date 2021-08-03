import { createSlice } from "@reduxjs/toolkit";

import { getFeatureType } from "features/waypoints/POICard";
import {
  clickOmniCardTripPlanningButton,
  clickOmniCardTripPlanningCloseButton,
} from "features/omnicard/omnicard-slice";
import { click as mapClick } from "features/map/map-slice";
import { searchGeocode } from "features/geocoders/geocoders-slice";

// TODO: consider making a Waypoint an extension of a GeoJSON Point Feature
export interface Waypoint {
  lon: number;
  lat: number;
  name?: string;
  layer?: string;
  layerName?: string;
  properties?: {
    curbramps?: boolean;
    crossing?: "marked" | "unmarked";
    description?: string;
    footway?: "sidewalk" | "crossing";
    incline?: number;
    indoor?: boolean;
    opening_hours?: string;
    surface?: "asphalt" | "concrete" | "gravel" | "paving_stones";
  };
}

export interface WaypointsState {
  waypoints?: Waypoint[];
  poi?: Waypoint;
}

const initialState = {
  waypoints: [],
  poi: null,
} as WaypointsState;

const waypointsSlice = createSlice({
  name: "waypoints",
  initialState,
  reducers: {
    closePOICard(state) {
      state.poi = null;
    },
    setOrigin(state, action) {
      state.poi = null;
      if (state.waypoints.length === 0) {
        // No waypoints have been added yet - add origin
        state.waypoints.push(action.payload);
      } else {
        // One or more waypoints have been set: replace the first one
        state.waypoints[0] = action.payload;
      }
    },
    setDestination(state, action) {
      state.poi = null;
      if (state.waypoints.length === 0) {
        // No origin has been set, so add a null as a placeholder for now
        state.waypoints.push(null);
        state.waypoints.push(action.payload);
      } else if (state.waypoints.length === 1) {
        // An origin has been set but not a destination -- push the destination
        state.waypoints.push(action.payload);
      } else {
        // Array is longer than 1: replace the index-1 value
        state.waypoints[1] = action.payload;
      }
    },
    swapWaypoints(state) {
      state.waypoints = state.waypoints.slice().reverse();
    },
    routeFromPOI(state) {
      state.waypoints[0] = state.poi;
      state.poi = null;
    },
    routeToPOI(state) {
      state.waypoints[1] = state.poi;
      state.poi = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clickOmniCardTripPlanningButton, (state) => {
        if (state.poi) {
          state.waypoints[0] = state.poi;
          state.poi = null;
        }
      })
      .addCase(clickOmniCardTripPlanningCloseButton, (state) => {
        state.waypoints = [];
      })
      .addCase(mapClick, (state, action) => {
        if (state.poi === null) {
          state.poi = {
            lon: action.payload.lon,
            lat: action.payload.lat,
          };
        } else {
          state.poi = null;
        }
        state.poi.layer = action.payload.layer || "";
        state.poi.layerName = action.payload.layerName || "";
        state.poi.properties = action.payload.properties || {};
        if (!state.poi.name) {
          // Try to create a name from properties
          const featureType = getFeatureType(state.poi.properties);
          if (featureType !== null) {
            state.poi.name = `${featureType}: ${state.poi.lat.toFixed(
              6
            )}, ${state.poi.lon.toFixed(6)}`;
          } else {
            state.poi.name = `${state.poi.lat.toFixed(
              6
            )}, ${state.poi.lon.toFixed(6)}`;
          }
        }
      })
      .addCase(searchGeocode, (state, action) => {
        state.poi = {
          lon: action.payload.lon,
          lat: action.payload.lat,
          name: action.payload.name,
          properties: action.payload.properties || {},
        };
      });
  },
});

export const {
  closePOICard,
  setOrigin,
  setDestination,
  swapWaypoints,
  routeFromPOI,
  routeToPOI,
} = waypointsSlice.actions;
export default waypointsSlice.reducer;
