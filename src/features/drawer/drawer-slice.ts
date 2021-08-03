import { createSlice } from "@reduxjs/toolkit";

export interface DrawerState {
  visible: boolean;
}

const initialState = {
  visible: false,
} as DrawerState;

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    show(state) {
      state.visible = true;
    },
    hide(state) {
      state.visible = false;
    },
  },
});

export const { show, hide } = drawerSlice.actions;
export default drawerSlice.reducer;
