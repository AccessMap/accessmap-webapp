import { createStore, applyMiddleware, combineReducers } from "redux";

import thunkMiddleware from "redux-thunk";
import { createMigrate, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reduxPlugin as router5ReduxPlugin } from "redux-router5";

import createAnalyticsMiddleware from "store/create-analytics-middleware";
import createOpenIDMiddleware from "store/create-openid-middleware";
import createRouter5Middleware from "store/create-router5-middleware";

import rootReducer from "reducers";

const configureStore = router => {
  const middlewares = [];
  // NOTE: Order is very important for middlewares - downstream can only intercept
  // upstream events

  // Thunks: async side effects
  middlewares.push(thunkMiddleware);

  // Persist (on client side) anlytics and routing profile info
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["analytics"],
    version: 0,
    migrate: createMigrate({ 0: state => ({ ...state }) }, { debug: false })
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Authentication middleware
  middlewares.push(createOpenIDMiddleware());

  // Analytics middleware
  if (process.env.ANALYTICS === "yes") {
    middlewares.push(createAnalyticsMiddleware());
  }

  // Router middleware
  middlewares.push(createRouter5Middleware(router));

  // Logging middleware - for debug purposes
  /* eslint-disable global-require */
  if (process.env.NODE_ENV !== "production") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
  }
  /* eslint-enble global-require */

  const store = createStore(persistedReducer, applyMiddleware(...middlewares));

  // Sync router navigations to redux store
  router.usePlugin(router5ReduxPlugin(store.dispatch));

  return store;
};

export default configureStore;
