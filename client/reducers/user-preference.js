import {
  TOGGLE_TRACKING,
  UPDATE_USER_ROUTING_PROFILE,
  FETCHING_USER_ROUTING_PROFILE,
  FINISHED_FETCHING_USER_ROUTING_PROFILE,
  CHANGE_USER_ROUTING_PROFILE_SELECTION,
} from 'actions';

import { defaultUserPreferences as defaults } from './defaults';
import { combineReducers } from 'redux';

function handleUserTracking (state = defaults.enableTracking, action) {
  switch (action.type) {
    case TOGGLE_TRACKING:
      return !state;
    default:
      return state;
  }
}

function handleUpdateUserRoutingProfiles (
  state = defaults.routingProfiles, action) {
  switch (action.type) {
    case UPDATE_USER_ROUTING_PROFILE:
      return action.payload;
    default:
      return state;
  }
}

function handleFetchingUserRoutingProfiles (
  state = defaults.fetchingUserRoutingProfiles, action) {
  switch (action.type) {
    case FETCHING_USER_ROUTING_PROFILE:
      return true;
    case FINISHED_FETCHING_USER_ROUTING_PROFILE:
      return false;
    default:
      return state;
  }
}

function handleChangeUserRoutingProfileSelection (
  state = defaults.fetchingUserRoutingProfiles, action) {
  switch (action.type) {
    case CHANGE_USER_ROUTING_PROFILE_SELECTION:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  enableTracking: handleUserTracking,
  userRoutingProfiles: handleUpdateUserRoutingProfiles,
  fetchingUserRoutingProfiles: handleFetchingUserRoutingProfiles,
});