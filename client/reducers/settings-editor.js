import { combineReducers } from 'redux';

import {
  MOUSE_OVER_DOWNHILL,
  MOUSE_OUT_DOWNHILL,
  OPEN_PREFERENCES,
  OPEN_UPHILL_PREFERENCES,
  OPEN_DOWNHILL_PREFERENCES,
  OPEN_OTHER_PREFERENCES,
  CLOSE_PREFERENCES,
} from 'actions';

import { defaultSettingsEditor as defaults } from './defaults';

const modes = {
  DOWNHILL: 'DOWNHILL',
  UPHILL: 'UPHILL',
  OTHER: 'OTHER',
  NONE: null,
};

const defaultMode = (state = defaults.mode, action) => {
  switch (action.type) {
    case MOUSE_OVER_DOWNHILL:
      return modes.DOWNHILL;
    case MOUSE_OUT_DOWNHILL:
      return modes.NONE;
    case OPEN_PREFERENCES:
      return modes.UPHILL;
    case OPEN_UPHILL_PREFERENCES:
      return modes.UPHILL;
    case OPEN_DOWNHILL_PREFERENCES:
      return modes.DOWNHILL;
    case OPEN_OTHER_PREFERENCES:
      return modes.OTHER;
    case CLOSE_PREFERENCES:
      return modes.NONE;
    default:
      return state;
  }
};

export default combineReducers({
  mode: defaultMode,
});
