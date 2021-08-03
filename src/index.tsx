// Polyfills and shims
import "polyfills";

import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

import "./main.scss";

// Note: order matters here (at least with webpack as of 2017-05-22).
// If styles + html get imported after App, component-level styling breaks
import App from "features/app/App";
import { store, persistor } from "store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
