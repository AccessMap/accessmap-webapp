import {
  TOGGLE_TRACKING,
} from 'actions';

import { defaultUserPreferences as defaults } from './defaults';
import { combineReducers } from 'redux';

function handleUserTracking(state = defaults.enableTracking, action) {
  switch (action.type) {
    case TOGGLE_TRACKING:
      return !state;
    default:
      return state;
  }
}

export default combineReducers({
  enableTracking: handleUserTracking,
});