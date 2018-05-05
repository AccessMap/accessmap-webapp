import { combineReducers } from 'redux';

import {
  CLOSE_PREFERENCES,
  CLEAR_SELECTED_FEATURES,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_ORIGIN_DESTINATION,
  MAP_CLICK,
  MOUSE_OVER_DOWNHILL,
  MOUSE_OUT_DOWNHILL,
  OPEN_DOWNHILL_PREFERENCES,
  OPEN_OTHER_PREFERENCES,
  OPEN_PREFERENCES,
  OPEN_UPHILL_PREFERENCES,
} from 'actions';

import { defaultMap } from './defaults';

const handleInclineUphill = (state = defaultMap.inclineUphill, action) => {
  switch (action.type) {
    case MOUSE_OVER_DOWNHILL:
    case OPEN_DOWNHILL_PREFERENCES:
      return false;
    case CLOSE_PREFERENCES:
    case MOUSE_OUT_DOWNHILL:
    case OPEN_PREFERENCES:
    case OPEN_UPHILL_PREFERENCES:
    case OPEN_OTHER_PREFERENCES:
      return true;
    default:
      return state;
  }
};

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
              width: feature.properties.width,
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
  inclineUphill: handleInclineUphill,
  selectedFeature: handleSelectedFeature,
});
