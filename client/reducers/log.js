import { combineReducers } from 'redux';

// Action types
import {
  LOG_BOUNDS,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleBounds = (state = defaults.bounds, action) => {
  switch (action.type) {
    case LOG_BOUNDS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  bounds: handleBounds,
});
