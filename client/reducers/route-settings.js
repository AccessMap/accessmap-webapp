import { combineReducers } from 'redux';

import {
  SET_DATE,
  SET_TIME,
} from 'actions';

import { defaultRouteSettings as defaults } from './defaults';

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
});
