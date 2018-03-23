import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import analytics from 'redux-analytics';
import rakam from 'rakam-js';

import rootReducer from 'reducers';

const middlewares = [];
// Thunk - manage side effects + async + access more state
middlewares.push(thunkMiddleware);

// Client-side analytics - remember user preferences.
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['analytics', 'routingprofile'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

//
// Rakam analytics support - using npm package appears to be uncommon, but
// is nice for consistency and bundling
//
// TODO: get user settings to set this on production server. Override is just
// for doing one-off user testing studies (NOT main site).

// Root URL + /analytics
const useAnalytics = process.env.FORCE_ANALYTICS === 'yes';
if (useAnalytics) {
  const analyticsURL = `//${window.location.host}/analytics`;
  const analyticsWriteKey = process.env.ANALYTICS_KEY;
  rakam.init(analyticsWriteKey, null, {
    apiEndpoint: analyticsURL,
    includeUtm: true,
    trackClicks: true,
    trackForms: true,
    includeReferrer: true,
  });

  const analyticsMiddleware = analytics(({ type, payload }, state) => {
    if (state.analytics || state.analytics == null) {
      rakam.logEvent(type, { ...payload });
    }
  });

  middlewares.push(analyticsMiddleware);
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
export const persistor = persistStore(store);
