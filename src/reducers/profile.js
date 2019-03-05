import profileDefaults from "profiles";
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

const handleRoutingProfile = (state = defaults, action) => {
  const profiles = state.profiles;

  switch (action.type) {
    case MOUSE_OVER_DOWNHILL:
    case OPEN_DOWNHILL_PREFERENCES:
      return {
        ...state,
        editorMode: modes.DOWNHILL
      };
    case MOUSE_OUT_DOWNHILL:
    case OPEN_PREFERENCES:
    case OPEN_UPHILL_PREFERENCES:
      return {
        ...state,
        editorMode: modes.UPHILL
      };
    case OPEN_BARRIERS_PREFERENCES:
      return {
        ...state,
        editorMode: modes.BARRIERS
      };
    case CLOSE_PREFERENCES:
      return {
        ...state,
        editorMode: modes.NONE
      };
    case SET_PROFILE:
      switch (action.payload) {
        case "Wheelchair":
          return {
            ...state,
            selectedProfile: 0
          };
        case "Powered":
          return {
            ...state,
            selectedProfile: 1
          };
        case "Cane":
          return {
            ...state,
            selectedProfile: 2
          };
        // TODO: this is where we'd search for custom profiles
        case "Custom":
          return {
            ...state,
            selectedProfile: 3
          }
        default:
          return state;
      }
    // case SET_PROFILE_DEFAULT:
    //   switch (action.payload) {
    //     case "wheelchair":
    //       profiles[0] = cloneObject(profileDefaults.wheelchair);
    //       return {
    //         ...state,
    //         profiles
    //       };
    //     case "powered":
    //       profiles[1] = cloneObject(profileDefaults.powered);
    //       return {
    //         ...state,
    //         profiles
    //       };
    //     case "cane":
    //       profiles[2] = cloneObject(profileDefaults.cane);
    //       return {
    //         ...state,
    //         profiles
    //       };
    //     // TODO: this is where we'd search for custom profiles
    //     default:
    //       return state;
    //   }
    // case SET_SPEED:
    //   profiles[state.selectedProfile].speed = action.payload;
    //   return {
    //     ...state,
    //     profiles
    //   };
    case SET_INCLINE_MAX:
      profiles[3].inclineMax = action.payload;
      return {
        ...state,
        profiles
      };
    case SET_INCLINE_MIN:
      profiles[3].inclineMin = action.payload;
      return {
        ...state,
        profiles
      };
    case TOGGLE_CURBRAMPS: {
      const newState = !profiles[3].avoidCurbs;
      profiles[3].avoidCurbs = newState;
      return {
        ...state,
        profiles
      };
    }
    default:
      return state;
  }
};

export default handleRoutingProfile;
