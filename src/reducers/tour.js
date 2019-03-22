import { combineReducers } from "redux";

import { COMPLETED_TOUR, DISABLE_TOUR, ENABLE_TOUR } from "actions";

import { defaultTour as defaults } from "reducers/defaults";

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

export default combineReducers({
  enabled: handleEnabled
});
