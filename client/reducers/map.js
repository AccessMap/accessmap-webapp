import { combineReducers } from 'redux';

import {
  MAP_CLICK
} from 'actions';

import { defaultMap } from './defaults';

function handleMapClick(state = defaultMap, action) {
  switch (action.type) {
    case MAP_CLICK: {
      const feature = action.payload[0];
      switch (feature && feature.layer.id) {
        case 'sidewalk':
          return {
            layer: 'Sidewalk',
            info: {
              grade: {
                description: 'Steepness',
                value: `${Math.abs(feature.properties.grade) * 100} %`
              }
            }
          };
        case 'crossing-ramps':
          return {
            layer: 'Street crossing with curb ramps',
          };
        case 'crossing-noramps':
          return {
            layer: 'Street crossing without curb ramps',
          };
        default:
          return null;
      }
    }
    default:
      return state;
  }
}

export default combineReducers({
  popup: handleMapClick
});
