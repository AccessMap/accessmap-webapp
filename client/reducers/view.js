import { combineReducers } from 'redux';

// Action types
import {
  RESIZE_MAP,
} from 'actions';

// Default actions
import { defaultView as defaults } from './defaults';

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
  mapWidth: handleMapWidth,
  mapHeight: handleMapHeight,
});
