import { combineReducers } from 'redux';

import {
  MAP_CLICK,
  CLEAR_SELECTED_FEATURES,
  MAP_CONTEXT_CLICK,
  CANCEL_CONTEXT,
  SET_ORIGIN,
  SET_DESTINATION,
  SET_ORIGIN_DESTINATION,
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
            layerName: 'Sidewalk',
            properties: {
              incline: {
                name: 'Incline',
                value: `${(Math.abs(feature.properties.incline) * 100).toFixed(1)} %`
              }
            },
          };
        case 'crossing-ramps':
          return {
            layer: 'crossing-ramps',
            layerName: 'Street Crossing',
            properties: {
              curbramps: {
                name: 'Curb Ramps',
                value: 'Yes',
              }
            }
          };
        case 'crossing-noramps':
          return {
            layer: 'crossing-noramps',
            layerName: 'Street Crossing',
            properties: {
              curbramps: {
                name: 'Curb Ramps',
                value: 'No',
              }
            }
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


function handleMapContextClick(state = defaultMap.contextClick, action) {
  switch (action.type) {
    case MAP_CONTEXT_CLICK:
      return {
        lng: action.payload.lng,
        lat: action.payload.lat
      }
    case CANCEL_CONTEXT:
    case SET_ORIGIN:
    case SET_DESTINATION:
    case SET_ORIGIN_DESTINATION:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  selectedFeature: handleSelectedFeature,
  contextClick: handleMapContextClick,
});
