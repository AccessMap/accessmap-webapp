import { combineReducers } from 'redux';
import profiles from 'profiles';

import {
  SET_INCLINE_MAX,
  SET_INCLINE_MIN,
  SET_PROFILE,
  SET_SPEED,
  TOGGLE_CURBRAMPS,
} from 'actions';

import { defaultRoutingProfile as defaults } from './defaults';

const handleProfileName = (state = defaults.profileName, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case SET_INCLINE_MAX:
    case SET_INCLINE_MIN:
    case TOGGLE_CURBRAMPS:
      return 'custom';
    default:
      return state;
  }
};

const handleSpeed = (state = defaults.speed, action) => {
  switch (action.type) {
    case SET_PROFILE:
      switch (action.payload) {
        case 'wheelchair':
          return profiles.wheelchair.speed;
        case 'powered':
          return profiles.powered.speed;
        case 'cane':
          return profiles.cane.speed;
        case 'custom':
          return state;
        default:
    }
    case SET_SPEED:
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
          return profiles.wheelchair.inclineMin;
        case 'powered':
          return profiles.powered.inclineMin;
        case 'cane':
          return profiles.cane.inclineMin;
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
  speed: handleSpeed,
  inclineMax: handleInclineMax,
  inclineMin: handleInclineMin,
  profileName: handleProfileName,
  requireCurbRamps: handleCurbRamps,
});
