import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import analytics from 'redux-analytics';
import rakam from 'rakam-js';

import rootReducer from 'reducers';

const middlewares = [];
middlewares.push(thunkMiddleware);

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');

  // Rakam analytics support - using npm package appears to be uncommon, but
  // is nice for consistency and bundling
  rakam.init(`${process.env.ANALYTICS_KEY}`, null, {
    // Root URL + /analytics
    apiEndpoint: window.location.protocol + '://' + window.location.host + '/analytics',
    includeUtm: true,
    trackClicks: true,
    trackForms: true,
    includeReferrer: true
  });

  const analyticsMiddleware = analytics(({ type, payload }, state) => {
    if (state.userSettings.track || process.env.NODE_ENV === 'development') {
      rakam.logEvent(type, { ...state.analytics, ...payload });
    }
  });

  middlewares.push(logger);
  middlewares.push(analyticsMiddleware);
}
/* eslint-enable global-require */


const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
