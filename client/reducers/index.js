import { combineReducers } from 'redux';

import geolocation from './geolocation';
import map from './map';
import tripplanning from './tripplanning';
import waypoints from './waypoints';
import view from './view';

/**
 * Routing to be implemented
 */
export default combineReducers({
  geolocation,
  map,
  tripplanning,
  waypoints,
  view,
});
