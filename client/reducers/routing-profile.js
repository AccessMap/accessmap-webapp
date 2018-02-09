import { combineReducers } from 'redux';

import {
  SET_INCLINE_IDEAL,
  SET_INCLINE_MAX,
  SET_INCLINE_MIN,
  TOGGLE_CURBRAMPS,
} from 'actions';

import { defaultRoutingProfile as defaults } from './defaults';

const handleInclineIdeal = (state = defaults.inclineIdeal, action) => {
  switch (action.type) {
    case SET_INCLINE_IDEAL:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineMax = (state = defaults.inclineMax, action) => {
  switch (action.type) {
    case SET_INCLINE_MAX:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineMin = (state = defaults.inclineMin, action) => {
  switch (action.type) {
    case SET_INCLINE_MIN:
      return action.payload;
    default:
      return state;
  }
};

const handleCurbRamps = (state = defaults.requireCurbRamps, action) => {
  switch (action.type) {
    case TOGGLE_CURBRAMPS:
      return !state;
    default:
      return state;
  }
};

export default combineReducers({
  inclineIdeal: handleInclineIdeal,
  inclineMax: handleInclineMax,
  inclineMin: handleInclineMin,
  requireCurbRamps: handleCurbRamps,
});
