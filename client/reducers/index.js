import { combineReducers } from 'redux';

import browser from './browser';
import geolocation from './geolocation';
import log from './log';
import map from './map';
import mode from './mode';
import routingprofile from './routing-profile';
import tripplanning from './tripplanning';
import view from './view';
import waypoints from './waypoints';

/**
 * Routing to be implemented
 */
export default combineReducers({
  browser,
  geolocation,
  log,
  map,
  mode,
  routingprofile,
  tripplanning,
  view,
  waypoints,
});
