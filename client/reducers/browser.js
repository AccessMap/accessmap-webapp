import { combineReducers } from 'redux';

import getMediaType from 'utils/media-type';
import getDisplayMode from 'utils/display-mode';

// Action types
import {
  LOAD_APP,
  RESIZE_WINDOW,
} from 'actions';

// Default actions
import { defaultBrowser as defaults } from './defaults';

const handleMediaType = (state = defaults.mediaType, action) => {
  switch (action.type) {
    case LOAD_APP:
    case RESIZE_WINDOW:
      return getMediaType();
    default:
      return state;
  }
};

const handleDisplayMode = (state = defaults.displayMode, action) => {
  switch (action.type) {
    case LOAD_APP:
    case RESIZE_WINDOW:
      return getDisplayMode();
    default:
      return state;
  }
};

export default combineReducers({
  displayMode: handleDisplayMode,
  mediaType: handleMediaType,
});
