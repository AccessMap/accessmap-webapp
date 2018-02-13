import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from '../store';
import { syncHistoryWithStore } from 'react-router-redux';
import App from '../containers/App';
import CallbackPage from '../components/OpenIDAuth/callback';
import SilentRenewPage from '../components/OpenIDAuth/silent_renew/callback';

const history = syncHistoryWithStore(browserHistory, store);

export default function Routes(props) {
  return (
    <Router history={history}>
      <Route path="/" component={App}/>
      <Route path="/callback" component={CallbackPage} />
      <Route path="/silent_renew" component={SilentRenewPage} />
    </Router>
  );
}
