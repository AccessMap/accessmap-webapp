import { combineReducers } from 'redux';

import activities from './activities';
import analytics from './analytics';
import browser from './browser';
import geolocation from './geolocation';
import linkoverlay from './link-overlay';
import log from './log';
import map from './map';
import profile from './profile';
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
  profile,
  toasts,
  tripplanning,
  view,
  waypoints,
});
