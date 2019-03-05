import { combineReducers } from "redux";

import cloneObject from "utils/clone-object";

import {
  CLOSE_PREFERENCES,
  MOUSE_OUT_DOWNHILL,
  MOUSE_OVER_DOWNHILL,
  OPEN_DOWNHILL_PREFERENCES,
  OPEN_BARRIERS_PREFERENCES,
  OPEN_PREFERENCES,
  OPEN_UPHILL_PREFERENCES,
  SET_INCLINE_MAX,
  SET_INCLINE_MIN,
  SET_PROFILE,
  SET_PROFILE_DEFAULT,
  SET_SPEED,
  TOGGLE_CURBRAMPS
} from "actions";

import { defaultProfile as defaults } from "reducers/defaults";

const modes = {
  DOWNHILL: "DOWNHILL",
  UPHILL: "UPHILL",
  BARRIERS: "BARRIERS",
  NONE: null
};

const handleEditorMode = (state = defaults.editorMode, action) => {
  switch (action.type) {
    case MOUSE_OVER_DOWNHILL:
    case OPEN_DOWNHILL_PREFERENCES:
      return modes.DOWNHILL;
    case MOUSE_OUT_DOWNHILL:
    case OPEN_PREFERENCES:
    case OPEN_UPHILL_PREFERENCES:
      return modes.UPHILL;
    case OPEN_BARRIERS_PREFERENCES:
      return modes.BARRIERS;
    case CLOSE_PREFERENCES:
      return modes.NONE;
    default:
      return state;
  }
};

const handleCustom = (state = defaults.custom, action) => {
  switch (action.type) {
    case SET_INCLINE_MAX:
      return {
        ...state,
        inclineMax: action.payload
      };
    case SET_INCLINE_MIN:
      return {
        ...state,
        inclineMin: action.payload
      };
    case TOGGLE_CURBRAMPS:
      return {
        ...state,
        avoidCurbs: !state.avoidCurbs
      };
    // case SET_SPEED:
    //   profiles[state.selectedProfile].speed = action.payload;
    //   return {
    //     ...state,
    //     profiles
    //   };
    default:
      return state;
  }
};

const handleSelected = (state = defaults.selected, action) => {
  switch (action.type) {
    case SET_PROFILE:
      // TODO: check for validity? How do we recover from errors here?
      return action.payload;
    default:
      return state;
  }
};

const handleFilter = (state = defaults.filter, action) => {
  // TODO: use this for logged-in mode + filtering. Allow favorites, etc.
  return state;
};

export default combineReducers({
  custom: handleCustom,
  editorMode: handleEditorMode,
  selected: handleSelected,
  filter: handleFilter
});
