import { combineReducers } from 'redux';

import {
  MAP_CLICK,
  CLEAR_SELECTED_FEATURES,
} from 'actions';

import { defaultMap } from './defaults';

function handleSelectedFeature(state = defaultMap.selectedFeature, action) {
  switch (action.type) {
    case MAP_CLICK: {
      const feature = action.payload[0];
      switch (feature && feature.layer.id) {
        case 'sidewalk':
          return {
            layer: 'sidewalk',
            properties: {
              grade: {
                name: 'Steepness',
                value: `${(Math.abs(feature.properties.grade) * 100).toFixed(1)} %`
              }
            },
          };
        case 'crossing-ramps':
          return {
            layer: 'crossing-ramps',
          };
        case 'crossing-noramps':
          return {
            layer: 'crossing-noramps',
          };
        default:
          return null;
      }
    }
    case CLEAR_SELECTED_FEATURES: {
      return null
    }
    default:
      return state;
  }
}

export default combineReducers({
  selectedFeature: handleSelectedFeature
});
