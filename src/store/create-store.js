import { createStore, applyMiddleware, combineReducers } from "redux";

import thunkMiddleware from "redux-thunk";
import { createMigrate, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reduxPlugin as router5ReduxPlugin } from "redux-router5";

import createAnalyticsMiddleware from "store/create-analytics-middleware";
import createAuthMiddleware from "store/create-auth-middleware";
import createRouter5Middleware from "store/create-router5-middleware";

import rootReducerObject from "reducers";

const configureStore = router => {
  const middlewares = [];
  // NOTE: Order is very important for middlewares - downstream can only intercept
  // upstream events

  // Thunks: async side effects
  middlewares.push(thunkMiddleware);

  // Persist (on client side) certain pieces of data
  const analyticsPersistConfig = {
    key: "analytics",
    storage,
    version: 0,
    migrate: createMigrate({ 0: state => ({ ...state }) }, { debug: false })
  };

  const authMigrations = {
    0: state => {
      return {
        ...state
      };
    },
    1: state => {
      if (state.sub.sub !== undefined) {
        // Fix bug where auth.sub was being set to a nested state of `auth` - reset to
        // null.
        return { ...state, sub: null };
      }
      return { ...state };
    }
  };

  const authPersistConfig = {
    key: "auth",
    storage,
    version: 1,
    migrate: createMigrate(authMigrations, { debug: false })
  };

  const persistedReducer = combineReducers({
    ...rootReducerObject,
    analytics: persistReducer(
      analyticsPersistConfig,
      rootReducerObject.analytics
    ),
    auth: persistReducer(authPersistConfig, rootReducerObject.auth)
  });

  // Authentication middleware
  middlewares.push(createAuthMiddleware());

  // Analytics middleware
  /* eslint-disable no-undef */
  if (ANALYTICS === "yes") {
    /* eslint-enable no-undef */
    middlewares.push(createAnalyticsMiddleware());
  }

  // Router middleware
  middlewares.push(createRouter5Middleware(router));

  // Logging middleware - for debug purposes
  /* eslint-disable global-require */
  /* eslint-disable no-undef */
  if (NODE_ENV === "development") {
    /* eslint-enable no-undef */
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }
  /* eslint-enable global-require */

  const store = createStore(persistedReducer, applyMiddleware(...middlewares));

  // Sync router navigations to redux store
  router.usePlugin(router5ReduxPlugin(store.dispatch));

  return store;
};

export default configureStore;
