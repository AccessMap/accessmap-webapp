import { createSlice } from "@reduxjs/toolkit";
import { requestDirections } from "features/directions/directions-slice";
import { saveProfile } from "features/profiles/profiles-slice";

export interface ToastState {
  toasts: string[];
}

const initialState = {
  toasts: [],
} as ToastState;

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    add(state, action) {
      state.toasts.push(action.payload);
    },
    pop(state) {
      state.toasts.shift();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestDirections.rejected, (state, action) => {
      if (!action.meta.aborted) {
        state.toasts.push(`Error: ${action.payload}`);
      }
    });
    builder.addCase(saveProfile.fulfilled, (state) => {
      state.toasts.push("Profile saved");
    });
    builder.addCase(saveProfile.rejected, (state) => {
      state.toasts.push("Couldn't save profile");
    });
  },
});

export const { add, pop } = toastSlice.actions;
export default toastSlice.reducer;
