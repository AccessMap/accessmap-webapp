import { combineReducers } from 'redux';

// Action types
import {
  LOAD_MAP,
  MAP_MOVE,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleBounds = (state = defaults.bounds, action) => {
  switch (action.type) {
    case LOAD_MAP:
    case MAP_MOVE:
      return action.payload.bounds;
    default:
      return state;
  }
};

export default combineReducers({
  bounds: handleBounds,
});
