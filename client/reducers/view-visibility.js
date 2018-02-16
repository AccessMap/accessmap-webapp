import {
  OPEN_USER_SETTINGS_PANE,
  CLOSE_USER_SETTINGS_PANE,
  OPEN_PROFILE_MANAGER_PANE,
  CLOSE_PROFILE_MANAGER_PANE
} from 'actions';
import { defaultViewVisbility as defaults } from './defaults';
import { combineReducers } from 'redux';

function handleUserSettingsPane(state = defaults.showUserSettingsPane, action) {
  switch (action.type) {
    case OPEN_USER_SETTINGS_PANE:
      return true;
    case CLOSE_USER_SETTINGS_PANE:
      return false;
    default:
      return state;
  }
}

function handleRoutingProfileManagerPane(state = defaults.showRoutingProfileManager, action) {
  switch (action.type) {
    case OPEN_PROFILE_MANAGER_PANE:
      return true;
    case CLOSE_PROFILE_MANAGER_PANE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  showUserSettingsPane: handleUserSettingsPane,
  showRoutingProfilePane: handleRoutingProfileManagerPane
});