import { combineReducers } from 'redux';

import {
  FAILED_ROUTE,
  RECEIVE_ROUTE,
  REQUEST_ROUTE,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_PROFILE,
  TOGGLE_SETTING_PROFILE,
  TOGGLE_TRIP_PLANNING,
} from 'actions';

import { defaultActivities as defaults } from './defaults';

const handleSettingProfile = (state = defaults.settingProfile, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload === 'custom' ? true : false;
    case TOGGLE_SETTING_PROFILE:
      return !action.payload;
    default:
      return state;
  }
}

const handlePlanningTrip = (state = defaults.planningTrip, action) => {
  switch (action.type) {
    case TOGGLE_TRIP_PLANNING:
      return !action.payload.planningTrip;
    case SET_ORIGIN:
    case SET_DESTINATION:
      return true;
    default:
      return state;
  }
};

const handleFetchingTrip = (state = defaults.fetchingTrip, action) => {
  switch (action.type) {
    case REQUEST_ROUTE:
      return true;
    case RECEIVE_ROUTE:
    case FAILED_ROUTE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  fetchingTrip: handleFetchingTrip,
  planningTrip: handlePlanningTrip,
  settingProfile: handleSettingProfile
});
