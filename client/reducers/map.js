import { combineReducers } from 'redux';

import {
  MAP_CLICK,
  CLEAR_SELECTED_FEATURES,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_ORIGIN_DESTINATION,
} from 'actions';

import { defaultMap } from './defaults';


const handleSelectedFeature = (state = defaultMap.selectedFeature, action) => {
  switch (action.type) {
    case MAP_CLICK: {
      const feature = action.payload.features[0];
      // If there's already a feature selected and the incoming click doesn't
      // have layer info, treat it as a 'clear' action
      if (state && !feature) {
        return null;
      }
      // If it's a map click elsewhere, clear everything but location.
      if (!feature) {
        return {
          layer: null,
          layerName: null,
          properties: null,
          location: action.payload.location,
        };
      }
      // If it's a special map feature, add extra info
      switch (feature.layer['source-layer']) {
        case 'sidewalks':
          return {
            layer: 'sidewalk',
            layerName: 'Sidewalk',
            properties: [{
              name: 'Incline',
              value: `${(Math.abs(feature.properties.incline) / 10).toFixed(1)} %`,
            }],
            location: action.payload.location,
          };
        case 'crossings':
          return {
            layer: 'crossing',
            layerName: 'Street Crossing',
            properties: [{
              name: 'Curb Ramps',
              value: feature.properties.curbramps ? 'Yes' : 'No',
            }, {
              name: 'Marked Crossing',
              value: feature.properties.marked ? 'Yes' : 'No',
            }],
            location: action.payload.location,
          };
        case 'elevator_paths':
          return {
            layer: 'elevator_paths',
            layerName: 'Elevator path',
            properties: [{
              name: 'Through',
              value: feature.properties.via,
            }, {
              name: 'Available',
              value: feature.properties.opening_hours,
            }],
            location: action.payload.location,
          };
        default:
          return null;
      }
    } case CLEAR_SELECTED_FEATURES: {
      return null;
    }
    case SET_ORIGIN:
    case SET_DESTINATION:
    case SET_ORIGIN_DESTINATION:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  selectedFeature: handleSelectedFeature,
});
