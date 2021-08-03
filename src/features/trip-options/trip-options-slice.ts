import { createSlice } from "@reduxjs/toolkit";

export interface TripOptionsState {
  dateTime: number;
  showTripOptions: boolean;
}

interface DatePayload {
  year: number;
  month: number;
  date: number;
}

interface TimePayload {
  hours: number;
  minutes: number;
}

const initialState = {
  dateTime: new Date().getTime(),
  showTripOptions: false,
} as TripOptionsState;

const tripOptionsSlice = createSlice({
  name: "trip-options",
  initialState,
  reducers: {
    setDate(state, action) {
      const date = new Date(state.dateTime);
      const payload: DatePayload = action.payload;
      date.setFullYear(payload.year);
      date.setMonth(payload.month);
      date.setDate(payload.date);
      state.dateTime = date.getTime();
    },
    setTime(state, action) {
      const date = new Date(state.dateTime);
      const payload: TimePayload = action.payload;
      date.setHours(payload.hours);
      date.setMinutes(payload.minutes);
      state.dateTime = date.getTime();
    },
  },
});

export const { setDate, setTime } = tripOptionsSlice.actions;
export default tripOptionsSlice.reducer;
