import { combineReducers } from 'redux';
import profiles from 'profiles';

import {
  SET_INCLINE_IDEAL,
  SET_INCLINE_MAX,
  SET_INCLINE_MIN,
  TOGGLE_CURBRAMPS,
  SET_PROFILE,
} from 'actions';

import { defaultRoutingProfile as defaults } from './defaults';

const handleProfileName = (state = defaults.profileName, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case SET_INCLINE_IDEAL:
    case SET_INCLINE_MAX:
    case SET_INCLINE_MIN:
    case TOGGLE_CURBRAMPS:
      return 'custom';
    default:
      return state;
  }
};

const handleInclineIdeal = (state = defaults.inclineIdeal, action) => {
  switch (action.type) {
    case SET_PROFILE:
      switch (action.payload) {
        case 'wheelchair':
        case 'powered':
        case 'cane':
        case 'custom':
          return -0.01
    }
    case SET_INCLINE_IDEAL:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineMax = (state = defaults.inclineMax, action) => {
  switch (action.type) {
    case SET_PROFILE:
      switch (action.payload) {
        case 'wheelchair':
          return profiles.wheelchair.inclineMax;
        case 'powered':
          return profiles.powered.inclineMax;
        case 'cane':
          return profiles.cane.inclineMax;
        case 'custom':
          return state;
        default:
    }
    case SET_INCLINE_MAX:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineMin = (state = defaults.inclineMin, action) => {
  switch (action.type) {
    case SET_PROFILE:
      switch (action.payload) {
        case 'wheelchair':
          profiles.wheelchair.inclineMin;
        case 'powered':
          profiles.powered.inclineMin;
        case 'cane':
          profiles.cane.inclineMin;
        case 'custom':
          return state;
    }
    case SET_INCLINE_MIN:
      return action.payload;
    default:
      return state;
  }
};

const handleCurbRamps = (state = defaults.requireCurbRamps, action) => {
  switch (action.type) {
    case SET_PROFILE:
      switch (action.payload) {
        case 'wheelchair':
          return true
        case 'powered':
          return true
        case 'cane':
          return false
        case 'custom':
          return state;
    }
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
  profileName: handleProfileName,
  requireCurbRamps: handleCurbRamps,
});
