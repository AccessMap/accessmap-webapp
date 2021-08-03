import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RouteResult } from "types";
import {
  selfCancelingFetchDirections,
  SignaledDirectionsOptions,
} from "api/unweaver";
import { WaypointsState } from "features/waypoints/waypoints-slice";
import { ProfilesState } from "features/profiles/profiles-slice";
import { TripOptionsState } from "features/trip-options/trip-options-slice";
import { clickOmniCardTripPlanningCloseButton } from "features/omnicard/omnicard-slice";

export interface DirectionsState {
  requesting: boolean;
  hasRoute: boolean;
  routeResult: RouteResult;
}

const initialState = {
  requesting: false,
  hasRoute: false,
  routeResult: null,
} as DirectionsState;

export const requestDirections = createAsyncThunk(
  "directions/fetchDirections",
  async (arg, { getState, rejectWithValue, signal }) => {
    const { waypoints: waypointsState } = getState() as {
      waypoints: WaypointsState;
    };
    const { waypoints } = waypointsState;

    const { profiles: profilesState } = getState() as {
      profiles: ProfilesState;
    };
    const { selected, profiles } = profilesState;
    const { tripOptions } = getState() as { tripOptions: TripOptionsState };

    const profile = profiles[selected];

    const directionsOptions: SignaledDirectionsOptions = {
      origin: waypoints[0],
      destination: waypoints[1],
      profile: profile,
      tripOptions: tripOptions,
      signal: signal,
    };

    const response = await selfCancelingFetchDirections(directionsOptions);

    if (response.code === "Error") {
      return rejectWithValue(response.message);
    } else if (response.code === "NoRoute") {
      return rejectWithValue("No Route");
    }
    return response;
  },
  {
    condition: (arg, { getState }): boolean => {
      const { waypoints: waypointsState } = getState() as {
        waypoints: WaypointsState;
      };
      const { waypoints } = waypointsState;

      if (waypoints.length < 2 || waypoints.includes(null)) {
        return false;
      }
      return true;
    },
  }
);

const directionsSlice = createSlice({
  name: "directions",
  initialState,
  reducers: {
    clickDirectionsInfoButton(state) {},
    clickDirectionsInfoCloseButton(state) {},
    clickStepsButton(state) {},
    clickStepsCloseButton(state) {},
  },
  extraReducers: (builder) => {
    builder.addCase(clickOmniCardTripPlanningCloseButton, (state) => {
      state.requesting = false;
      state.hasRoute = false;
      state.routeResult = null;
    });
    builder.addCase(requestDirections.fulfilled, (state, action) => {
      state.requesting = false;
      state.hasRoute = true;
      state.routeResult = action.payload;
    });
    builder.addCase(requestDirections.pending, (state) => {
      state.requesting = true;
    });
    builder.addCase(requestDirections.rejected, (state, action) => {
      if (!action.meta.aborted) {
        state.requesting = false;
      }
      // If it was aborted, then it's making another request - keep status true
    });
  },
});

export const {
  clickStepsButton,
  clickStepsCloseButton,
  clickDirectionsInfoButton,
  clickDirectionsInfoCloseButton,
} = directionsSlice.actions;
export default directionsSlice.reducer;
