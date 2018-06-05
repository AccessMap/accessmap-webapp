import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';

import './stylesheets/main.scss';
import './fonts/index.css';
import './index.html';

// Note: order matters here (at least with webpack as of 2017-05-22).
// If styles + html get imported after App, component-level styling breaks
/* eslint-disable import/first */
// import App from 'containers/App';
import Index from 'containers/Index';
import createRouter from 'router/create-router';
import createStore from 'store/create-store';
import createPersistor from 'store/create-persistor';
/* eslint-enable import/first */

const router = createRouter();
const store = createStore(router);
const persistor = createPersistor(store);

router.start(() => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  );
});
