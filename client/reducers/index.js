import { combineReducers } from 'redux';

import activities from './activities';
import analytics from './analytics';
import browser from './browser';
import geolocation from './geolocation';
import linkoverlay from './link-overlay';
import log from './log';
import map from './map';
import mode from './mode';
import routingprofile from './routing-profile';
import toasts from './toasts';
import tripplanning from './tripplanning';
import view from './view';
import waypoints from './waypoints';

/**
 * Routing to be implemented
 */
export default combineReducers({
  activities,
  analytics,
  browser,
  geolocation,
  linkoverlay,
  log,
  map,
  mode,
  routingprofile,
  toasts,
  tripplanning,
  view,
  waypoints,
});
