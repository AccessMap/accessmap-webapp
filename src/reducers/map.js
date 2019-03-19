import { combineReducers } from "redux";

import {
  CLOSE_PREFERENCES,
  CLEAR_SELECTED_FEATURES,
  SET_DESTINATION,
  SET_ORIGIN,
  SET_ORIGIN_DESTINATION,
  MAP_CLICK,
  MAP_TILEJSON_SUCCESS,
  MOUSE_OVER_DOWNHILL,
  MOUSE_OUT_DOWNHILL,
  OPEN_DOWNHILL_PREFERENCES,
  OPEN_BARRIERS_PREFERENCES,
  OPEN_PREFERENCES,
  OPEN_UPHILL_PREFERENCES,
  SELECT_REGION
} from "actions";

import { defaultMap } from "reducers/defaults";

const handleRegionName = (state = defaultMap.regionName, action) => {
  switch (action.type) {
    case SELECT_REGION:
      return action.payload;
    default:
      return state;
  }
};

const handleInclineUphill = (state = defaultMap.inclineUphill, action) => {
  switch (action.type) {
    case MOUSE_OVER_DOWNHILL:
    case OPEN_DOWNHILL_PREFERENCES:
      return false;
    case CLOSE_PREFERENCES:
    case MOUSE_OUT_DOWNHILL:
    case OPEN_PREFERENCES:
    case OPEN_UPHILL_PREFERENCES:
    case OPEN_BARRIERS_PREFERENCES:
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
          properties: null
        };
      }

      return {
        layerId: feature.layer.id,
        sourceLayer: feature.layer["source-layer"],
        location: action.payload.location,
        properties: feature.properties
      };
    }
    case CLEAR_SELECTED_FEATURES: {
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
  regionName: handleRegionName,
  inclineUphill: handleInclineUphill,
  selectedFeature: handleSelectedFeature
});
