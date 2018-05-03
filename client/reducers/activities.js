import { combineReducers } from 'redux';

import {
  HIDE_DRAWER,
  CLOSE_MAP_INFO,
  CLOSE_DIRECTIONS,
  SHOW_DRAWER,
  RECEIVE_ROUTE,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_PROFILE,
  TOGGLE_SETTING_PROFILE,
  TOGGLE_TRIP_PLANNING,
  VIEW_DIRECTIONS,
  VIEW_MAP_INFO,
} from 'actions';

import { defaultActivities as defaults } from './defaults';

const handleDrawerVisible = (state = defaults.drawerVisible, action) => {
  switch (action.type) {
    case SHOW_DRAWER:
      return true;
    case HIDE_DRAWER:
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

const handleViewingDirections = (state = defaults.viewingDirections, action) => {
  switch (action.type) {
    case VIEW_DIRECTIONS:
      return true;
    case CLOSE_DIRECTIONS:
      return false;
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

const handleViewingRoute = (state = defaults.viewingRoute, action) => {
  switch (action.type) {
    case RECEIVE_ROUTE:
      return true;
    default:
      return state;
  }
};

export default combineReducers({
  drawerVisible: handleDrawerVisible,
  planningTrip: handlePlanningTrip,
  settingProfile: handleSettingProfile,
  viewingDirections: handleViewingDirections,
  viewingMapInfo: handleViewingMapInfo,
  viewingRoute: handleViewingRoute,
});
