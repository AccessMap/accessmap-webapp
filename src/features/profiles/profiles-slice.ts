import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { Profile, defaultProfiles } from "profiles/profiles";

import {
  saveProfile as putSaveProfile,
  fetchProfile as getFetchProfile,
  fetchAccessToken,
} from "api/accessmap";

export interface ProfilesState {
  selected: "Wheelchair" | "Powered" | "Cane" | "Custom";
  profiles: {
    Wheelchair: Profile;
    Powered: Profile;
    Cane: Profile;
    Custom: Profile;
  };
  editingProfile:
    | "UPHILL"
    | "DOWNHILL"
    | "BARRIERS"
    | "STREET_AVOIDANCE"
    | null;
}

const initialState = {
  selected: "Custom",
  profiles: {
    ...defaultProfiles,
  },
  editingProfile: null,
} as ProfilesState;

export const fetchProfile = createAsyncThunk(
  "profiles/saveProfile",
  async (arg, { getState, rejectWithValue }) => {
    const { user } = getState() as {
      user: { accessToken };
    };
    const { accessToken } = user;

    try {
      const profile = await getFetchProfile(accessToken);
      return profile;
    } catch {
      // Try to get a new access token and try again
      const { user } = getState() as {
        user: { refreshToken };
      };
      const { refreshToken } = user;
      const accessToken = await fetchAccessToken(refreshToken);
      try {
        const profile = await getFetchProfile(accessToken);
        if (profile) return profile;
        return rejectWithValue("no-saved-profiles");
      } catch {
        return rejectWithValue("fetch-profile-failed");
      }
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profiles/saveProfile",
  async (arg, { getState, rejectWithValue }) => {
    const { profiles } = getState() as {
      profiles: { Custom: Profile };
    };
    const profile = profiles.Custom;

    const { user } = getState() as {
      user: { accessToken };
    };
    const { accessToken } = user;

    try {
      await putSaveProfile(profile, accessToken);
      return;
    } catch {
      // Try to get a new access token and try again
      const { user } = getState() as {
        user: { refreshToken };
      };
      const { refreshToken } = user;
      const accessToken = await fetchAccessToken(refreshToken);
      try {
        await putSaveProfile(profile, accessToken);
        return;
      } catch {
        return rejectWithValue("save-profile-failed");
      }
    }
  }
);

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    select(state, action) {
      state.selected = action.payload;
    },
    editProfile(state, action) {
      state.editingProfile = action.payload;
    },
    clickProfileEditButton(state) {
      state.editingProfile = "UPHILL";
    },
    clickProfileEditCloseButton(state) {
      state.editingProfile = null;
    },
    customUphillMax(state, action) {
      state.profiles.Custom.uphillMax = action.payload;
    },
    customDownhillMax(state, action) {
      state.profiles.Custom.downhillMax = action.payload;
    },
    customAvoidCurbs(state, action) {
      state.profiles.Custom.avoidCurbs = action.payload;
    },
    customStreetAvoidance(state, action) {
      state.profiles.Custom.streetAvoidance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profiles.Custom.uphillMax = action.payload.uphillMax;
      state.profiles.Custom.downhillMax = action.payload.downhillMax;
      state.profiles.Custom.avoidCurbs = action.payload.avoidCurbs;
      state.profiles.Custom.streetAvoidance = action.payload.streetAvoidance;
    });
  },
});

export const {
  select,
  editProfile,
  clickProfileEditButton,
  clickProfileEditCloseButton,
  customUphillMax,
  customDownhillMax,
  customAvoidCurbs,
  customStreetAvoidance,
} = profilesSlice.actions;
export default profilesSlice.reducer;
