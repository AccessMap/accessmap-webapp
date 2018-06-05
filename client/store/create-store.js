import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { router5Middleware } from 'redux-router5';

import createAnalyticsMiddleware from 'store/create-analytics-middleware';
import createOpenIDMiddleware from 'store/create-openid-middleware';

import rootReducer from 'reducers';

const configureStore = (router) => {
  const middlewares = [];

  // Thunks: async side effects
  middlewares.push(thunkMiddleware);

  // Analytics middleware
  middlewares.push(createAnalyticsMiddleware());

  // Authentication middleware
  middlewares.push(createOpenIDMiddleware());

  // Router middleware
  middlewares.push(router5Middleware(router));

  // Logging middleware - for debug purposes
  /* eslint-disable global-require */
  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }
  /* eslint-enble global-require */

  // Persist (on client side) anlytics and routing profile info
  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['analytics', 'profile'],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
    applyMiddleware(...middlewares),
  );

  return store;
};

export default configureStore;
