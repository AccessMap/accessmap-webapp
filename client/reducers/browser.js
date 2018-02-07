import { combineReducers } from 'redux';

import getMediaType from 'utils/mediaTypes';

// Action types
import {
  RESIZE_WINDOW,
} from 'actions';

// Default actions
import { defaultBrowser as defaults } from './defaults';


function handleMediaType(state = defaults.mediaType, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return getMediaType();
    default:
      return state;
  }
}


export default combineReducers({
  mediaType: handleMediaType,
});
