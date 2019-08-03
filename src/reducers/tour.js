import { combineReducers } from "redux";

import { COMPLETED_TOUR, DISABLE_TOUR, ENABLE_TOUR, LOAD_MAP } from "actions";
import * as actions from "actions";

import { defaultTour as defaults } from "reducers/defaults";

let anyActionType = Object.keys(actions).filter(key => {
  let value = actions[key];
  if (typeof value === "string" && value.toUpperCase() === value) {
    return true;
  }
  return false;
});

const handleEnabled = (state = defaults.enabled, action) => {
  switch (action.type) {
    case ENABLE_TOUR:
      return true;
    case COMPLETED_TOUR:
    case DISABLE_TOUR:
      return false;
    default:
      return state;
  }
};

const handleTips = (state = defaults.tips, action) => {
  if (action.type === LOAD_MAP) {
    return true;
  } else {
    return !anyActionType.includes(action.type);
  }
};

export default combineReducers({
  enabled: handleEnabled,
  tips: handleTips
});
