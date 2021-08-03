import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface GeolocationState {
  status: "Ok" | "none" | "unavailable";
  lon: number;
  lat: number;
  accuracy: number;
}

const initialState = {
  status: "none",
  lon: null,
  lat: null,
  accuracy: 0,
} as GeolocationState;

interface GeolocationResult {
  lon: number;
  lat: number;
  accuracy: number;
}

export const requestGeolocation = createAsyncThunk(
  "geolocation/requestGeolocation",
  async (arg, { rejectWithValue }) => {
    try {
      const position: GeolocationResult = await new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                lon: position.coords.longitude,
                lat: position.coords.latitude,
                accuracy: position.coords.accuracy,
              });
            },
            (error) => {
              reject(error.code);
            }
          );
        }
      );

      return position;
    } catch (err) {
      if (err === 1) {
        // Permission to use geolocation denied
        return rejectWithValue("permission-denied");
      } else if (err === 2) {
        // Attempt to retrieve location failed internally - browser issue,
        // blocker, etc.
        return rejectWithValue("location-failed");
      } else if (err === 3) {
        // Timeout
        return rejectWithValue("timeout");
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

// TODO: this could be a createAsyncThunk?
const mapSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    clear(state) {
      state.status = "none";
      state.lon = null;
      state.lat = null;
      state.accuracy = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestGeolocation.fulfilled, (state, action) => {
      state.status = "Ok";
      state.lon = action.payload.lon;
      state.lat = action.payload.lat;
      state.accuracy = action.payload.accuracy;
    });
    builder.addCase(requestGeolocation.rejected, (state, action) => {
      state.lon = null;
      state.lat = null;
      state.accuracy = 0;
      if (action.payload === "permission-denied") {
        state.status = "unavailable";
      } else if (action.payload === "location-failed") {
        state.status = "unavailable";
      } else if (action.payload === "timeout") {
        state.status = "unavailable";
      }
    });
  },
});

export const { clear } = mapSlice.actions;
export default mapSlice.reducer;
