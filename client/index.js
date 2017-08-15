import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import './style.scss';
import './fonts/index.css';
import './index.html';

// Note: order matters here (at least with webpack as of 2017-05-22).
// If styles + html get imported after App, component-level styling breaks
/* eslint-disable import/first */
import App from 'containers/App';
import store from 'store';
/* eslint-enable import/first */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
