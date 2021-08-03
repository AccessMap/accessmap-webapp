import { createSlice } from "@reduxjs/toolkit";

export interface OmniCardState {}

const initialState = {} as OmniCardState;

const omnicardSlice = createSlice({
  name: "omnicard",
  initialState,
  reducers: {
    clickOmniCardTripPlanningButton(state) {},
    clickOmniCardTripPlanningCloseButton(state) {},
  },
});

export const {
  clickOmniCardTripPlanningButton,
  clickOmniCardTripPlanningCloseButton,
} = omnicardSlice.actions;
export default omnicardSlice.reducer;
