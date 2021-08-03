import { createSlice } from "@reduxjs/toolkit";

export interface LinkModalState {
  selected: "about" | "contact" | null;
}

const initialState = {
  selected: null,
} as LinkModalState;

const linkModalSlice = createSlice({
  name: "links-modal",
  initialState,
  reducers: {
    click(state, action) {
      state.selected = action.payload;
    },
    close(state) {
      state.selected = null;
    },
  },
});

export const { click, close } = linkModalSlice.actions;
export default linkModalSlice.reducer;
