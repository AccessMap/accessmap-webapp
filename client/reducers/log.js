import { combineReducers } from 'redux';

// Action types
import {
  LOG_BOUNDS,
  MAP_MOVE,
  RESIZE_OMNICARD,
} from 'actions';

// Default actions
import { defaultLog as defaults } from './defaults';

const handleBounds = (state = defaults.bounds, action) => {
  switch (action.type) {
    case LOG_BOUNDS:
      return action.payload;
    case MAP_MOVE:
      return action.payload.bounds;
    default:
      return state;
  }
};

const handleOmniCardDim = (state = defaults.omniCardDim, action) => {
  switch (action.type) {
    case RESIZE_OMNICARD:
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  bounds: handleBounds,
  omniCardDim: handleOmniCardDim,
});
