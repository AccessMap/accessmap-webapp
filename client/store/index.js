import { createStore, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import analytics from 'analytics';

import rootReducer from 'reducers';

const middlewares = [];
middlewares.push(thunkMiddleware);

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middlewares.push(logger);
  middlewares.push(analytics);
}
/* eslint-enable global-require */


const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
