import { combineReducers } from 'redux';

import geolocation from './geolocation';
import map from './map';
import tripplanning from './tripplanning';
import waypoints from './waypoints';
import view from './view';

import { routerReducer } from 'react-router-redux';
import { reducer as oidcReducer } from 'redux-oidc';

/**
 * Routing to be implemented
 */
export default combineReducers({
  geolocation,
  map,
  tripplanning,
  waypoints,
  view,
  routing: routerReducer,
  oidc: oidcReducer,
});
