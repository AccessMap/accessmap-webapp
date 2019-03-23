import { combineReducers } from "redux";

import regions from "constants/regions";

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
  OPEN_BARRIERS_PREFERENCES,
  OPEN_PREFERENCES,
  OPEN_UPHILL_PREFERENCES,
  SELECT_REGION
} from "actions";

import { defaultMap } from "reducers/defaults";

const handleRegion = (state = defaultMap.region, action) => {
  switch (action.type) {
    case "@@router5/TRANSITION_SUCCESS": {
      if (["root", "directions"].includes(action.payload.route.name)) {
        if (action.payload.route.params.region !== undefined) {
          for (let feature of regions.features) {
            if (feature.properties.key === action.payload.route.params.region) {
              return feature;
            }
          }
        }
      }
      return state;
    }
    case SELECT_REGION: {
      let region;
      for (let feature of regions.features) {
        if (feature.properties.key === action.payload) {
          region = feature;
          break;
        }
      }
      if (region === undefined) {
        region = regions.features[0];
      }
      return region;
    }
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
  region: handleRegion,
  inclineUphill: handleInclineUphill,
  selectedFeature: handleSelectedFeature
});
