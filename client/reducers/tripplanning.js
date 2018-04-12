import { combineReducers } from 'redux';

import {
  RECEIVE_ROUTE,
  SET_DATE,
  SET_TIME,
  TOGGLE_TRIP_PLANNING,
} from 'actions';

import { defaultTripPlanning as defaults } from './defaults';

const handleRoute = (state = defaults.routeResult, action) => {
  switch (action.type) {
    case TOGGLE_TRIP_PLANNING:
      return action.payload.planningTrip ? null : state;
    case RECEIVE_ROUTE:
      return action.payload.routeResult;
    default:
      return state;
  }
};

const handleDateTime = (state = defaults.dateTime, action) => {
  const date = new Date(state);
  switch (action.type) {
    case SET_DATE:
      date.setFullYear(action.payload.year);
      date.setMonth(action.payload.month);
      date.setDate(action.payload.date);
      return date.getTime();
    case SET_TIME:
      date.setHours(action.payload.hours);
      date.setMinutes(action.payload.minutes);
      return date.getTime();
    default:
      return state;
  }
};

export default combineReducers({
  dateTime: handleDateTime,
  routeResult: handleRoute,
});
