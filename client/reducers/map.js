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
          location: action.payload.location,
          properties: null,
        };
      }
      // If it's a special map feature, add extra info
      switch (feature.layer['source-layer']) {
        case 'sidewalks':
          return {
            layer: 'sidewalk',
            layerName: 'Sidewalk',
            location: action.payload.location,
            properties: {
              description: `${feature.properties.side} of ${feature.properties.street_name}`,
              incline: feature.properties.incline / 1000,
              surface: feature.properties.surface,
            },
          };
        case 'crossings':
          return {
            layer: 'crossing',
            layerName: 'Street Crossing',
            location: action.payload.location,
            properties: {
              curbramps: feature.properties.curbramps,
              marked: feature.properties.marked,
            },
          };
        case 'elevator_paths': {
          return {
            layer: 'elevator_paths',
            layerName: 'Elevator path',
            location: action.payload.location,
            properties: {
              indoor: feature.properties.indoor,
              openingHours: feature.properties.opening_hours,
              via: feature.properties.via,
            },
          };
        }
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
