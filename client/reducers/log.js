import { combineReducers } from 'redux';

// Action types
import {
  MAP_LOAD,
  MAP_MOVE,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleBounds = (state = defaults.bounds, action) => {
  switch (action.type) {
    case MAP_LOAD:
      return action.payload;
    case MAP_MOVE:
      return action.payload.bounds;
    default:
      return state;
  }
};

export default combineReducers({
  bounds: handleBounds,
});
