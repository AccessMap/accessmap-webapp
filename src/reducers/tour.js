import { combineReducers } from "redux";
import { actionTypes } from "redux-router5";

import { directionsTours, mainTours } from "constants/tours";
import { COMPLETED_TOUR, DISABLE_TOUR, ENABLE_TOUR } from "actions";

import { defaultTour as defaults } from "./defaults";

const handleTours = (state = defaults.tours, action) => {
  switch (action.type) {
    case actionTypes.TRANSITION_SUCCESS: {
      if (action.payload.route && action.payload.route.name) {
        if (action.payload.route.name === "directions") {
          return directionsTours;
        }
        if (action.payload.route.name === "root") {
          return mainTours;
        }
      }
      return state;
    }
    default:
      return state;
  }
};

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
  tours: handleTours,
  enabled: handleEnabled
});
