import { combineReducers } from 'redux';

import geolocation from './geolocation';
import map from './map';
import tripplanning from './tripplanning';
import waypoints from './waypoints';
import view from './view';
import userSettings from './user-settings';

/**
 * Routing to be implemented
 */
export default combineReducers({
  geolocation,
  map,
  tripplanning,
  waypoints,
  view,
  userSettings
});
