import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import './style.scss';
import './fonts/index.css';
import './index.html';

import { OidcProvider } from 'redux-oidc';
import userManager from './utils/UserManager';
import Routes from './routes'

// Note: order matters here (at least with webpack as of 2017-05-22).
// If styles + html get imported after App, component-level styling breaks
/* eslint-disable import/first */
import store from 'store';
/* eslint-enable import/first */

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider userManager={userManager} store={store}>
      <Routes />
    </OidcProvider>
  </Provider>,
  document.getElementById('root')
);
