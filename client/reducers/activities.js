import { combineReducers } from 'redux';

import {
  CLOSE_MAP_INFO,
  FAILED_ROUTE,
  HIDE_TRIP_OPTIONS,
  RECEIVE_ROUTE,
  REQUEST_ROUTE,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_PROFILE,
  SHOW_TRIP_OPTIONS,
  TOGGLE_SETTING_PROFILE,
  TOGGLE_TRIP_PLANNING,
  VIEW_MAP_INFO,
} from 'actions';

import { defaultActivities as defaults } from './defaults';

const handleShowTripOptions = (state = defaults.showTripOptions, action) => {
  switch (action.type) {
    case SHOW_TRIP_OPTIONS:
      return true;
    case HIDE_TRIP_OPTIONS:
      return false;
    default:
      return state;
  }
};

const handleSettingProfile = (state = defaults.settingProfile, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload === 'custom';
    case TOGGLE_SETTING_PROFILE:
      return !action.payload;
    default:
      return state;
  }
};

const handleViewingMapInfo = (state = defaults.viewingMapInfo, action) => {
  switch (action.type) {
    case VIEW_MAP_INFO:
      return true;
    case CLOSE_MAP_INFO:
      return false;
    default:
      return state;
  }
};


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
  settingProfile: handleSettingProfile,
  showTripOptions: handleShowTripOptions,
  viewingMapInfo: handleViewingMapInfo,
});
