import { createSlice } from "@reduxjs/toolkit";

// TODO: define here instead?
import { Activity } from "types";
import { routeFromPOI, routeToPOI } from "features/waypoints/waypoints-slice";
import {
  clickOmniCardTripPlanningButton,
  clickOmniCardTripPlanningCloseButton,
} from "features/omnicard/omnicard-slice";
import {
  editProfile,
  clickProfileEditButton,
  clickProfileEditCloseButton,
} from "features/profiles/profiles-slice";
import {
  clickStepsButton,
  clickStepsCloseButton,
  clickDirectionsInfoButton,
  clickDirectionsInfoCloseButton,
} from "features/directions/directions-slice";

export interface ActivitiesState {
  currentActivity: Activity;
  lastActivity: Activity;
}

const initialState = {
  currentActivity: "default",
  lastActivity: null,
} as ActivitiesState;

// Helper function for returning to previous activity
const reverseActivity = (state) => {
  const lastActivity = state.lastActivity;
  state.lastActivity = state.currentActivity;
  state.currentActivity = lastActivity;
};

// Helper function for setting new activities
const setActivity = (state, newActivity: string): void => {
  state.lastActivity = state.currentActivity;
  state.currentActivity = newActivity;
};

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(clickOmniCardTripPlanningButton, (state) => {
        setActivity(state, "planning-trip");
      })
      .addCase(clickOmniCardTripPlanningCloseButton, (state) => {
        state.lastActivity = "planning-trip";
        state.currentActivity = "default";
      })
      .addCase(clickProfileEditButton, (state) => {
        setActivity(state, "setting-profile");
      })
      .addCase(clickProfileEditCloseButton, (state) => {
        reverseActivity(state);
      })
      .addCase(editProfile, (state) => {
        setActivity(state, "setting-profile");
      })
      .addCase(clickStepsButton, (state) => {
        setActivity(state, "directions-steps");
      })
      .addCase(clickStepsCloseButton, (state) => {
        setActivity(state, "directions");
      })
      .addCase(clickDirectionsInfoButton, (state) => {
        setActivity(state, "directions-info");
      })
      .addCase(clickDirectionsInfoCloseButton, (state) => {
        setActivity(state, "directions");
      })
      .addCase(routeFromPOI, (state) => {
        setActivity(state, "planning-trip");
      })
      .addCase(routeToPOI, (state) => {
        setActivity(state, "planning-trip");
      });
  },
});

export default activitySlice.reducer;
