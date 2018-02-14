import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import store from '../store';
import { syncHistoryWithStore } from 'react-router-redux';
import App from '../containers/App';
import AuthProviderCallbackPage from '../components/OpenIDAuth/AuthProviderCallback';
import SilentRenewPage from '../components/OpenIDAuth/SilentRenew';

const history = syncHistoryWithStore(browserHistory, store);

export default function Routes(props) {
  return (
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/callback" component={AuthProviderCallbackPage} />
      <Route path="/silent_renew" component={SilentRenewPage} />
    </Router>
  );
}
