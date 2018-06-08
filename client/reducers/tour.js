import { combineReducers } from 'redux';
import { actionTypes } from 'redux-router5';

import { mainTour, directionsTour } from 'constants/tours';
import { COMPLETED_TOUR, DISABLE_TOUR, ENABLE_TOUR } from 'actions';

import { defaultTour as defaults } from './defaults';

const handleTour = (state = defaults.tour, action) => {
  switch (action.type) {
    case actionTypes.TRANSITION_SUCCESS:
      if (action.payload.route && action.payload.route.name) {
        if (action.payload.route.name.startsWith('root.directions')) {
          return directionsTour;
        }
        if (action.payload.route.name.startsWith('root')) {
          return mainTour;
        }
      }
      return state;
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
  tour: handleTour,
  enabled: handleEnabled,
});
