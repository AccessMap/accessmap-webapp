import { combineReducers } from "redux";

import {
  CLOSE_PREFERENCES,
  FETCH_PROFILE_SUCCESS,
  MOUSE_OUT_DOWNHILL,
  MOUSE_OVER_DOWNHILL,
  OPEN_DOWNHILL_PREFERENCES,
  OPEN_BARRIERS_PREFERENCES,
  OPEN_PREFERENCES,
  OPEN_UPHILL_PREFERENCES,
  LOG_IN,
  NO_SAVED_PROFILES,
  SET_UPHILL_MAX,
  SET_DOWNHILL_MAX,
  SELECT_PROFILE,
  TOGGLE_CURBRAMPS,
  TOGGLE_TACTILEPAVING
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
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case SET_UPHILL_MAX:
      return {
        ...state,
        uphillMax: action.payload
      };
    case SET_DOWNHILL_MAX:
      return {
        ...state,
        downhillMax: action.payload
      };
    case TOGGLE_CURBRAMPS:
      return {
        ...state,
        avoidCurbs: !state.avoidCurbs
      };
    case TOGGLE_TACTILEPAVING:
      return {
        ...state,
        tactilePaving: !state.tactilePaving
      }
    // case SET_SPEED:
    //   profiles[state.selectedProfile].speed = action.payload;
    //   return {
    //     ...state,
    //     profiles
    //   };
    case NO_SAVED_PROFILES:
    default:
      return state;
  }
};

const handleSelected = (state = defaults.selected, action) => {
  switch (action.type) {
    case SELECT_PROFILE:
      // TODO: check for validity? How do we recover from errors here?
      return action.payload;
    case LOG_IN:
    case FETCH_PROFILE_SUCCESS:
    case NO_SAVED_PROFILES:
      return "Custom";
    default:
      return state;
  }
};

const handleFilter = (state = defaults.filter) => {
  // TODO: use this for logged-in mode + filtering. Allow favorites, etc.
  return state;
};

export default combineReducers({
  custom: handleCustom,
  editorMode: handleEditorMode,
  selected: handleSelected,
  filter: handleFilter
});
