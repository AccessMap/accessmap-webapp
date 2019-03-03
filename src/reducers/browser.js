import { combineReducers } from "redux";

import getMediaType from "utils/media-type";
import getDisplayMode from "utils/display-mode";

// Action types
import { LOAD_APP, RESIZE_MAP, RESIZE_WINDOW } from "actions";

// Default actions
import { defaultBrowser as defaults } from "reducers/defaults";

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

const handleMapHeight = (state = defaults.mapHeight, action) => {
  switch (action.type) {
    case RESIZE_MAP:
      return action.payload.height;
    default:
      return state;
  }
};

const handleMapWidth = (state = defaults.mapWidth, action) => {
  switch (action.type) {
    case RESIZE_MAP:
      return action.payload.width;
    default:
      return state;
  }
};

export default combineReducers({
  displayMode: handleDisplayMode,
  mediaType: handleMediaType,
  mapWidth: handleMapWidth,
  mapHeight: handleMapHeight
});
