import {
  LOG_IN,
  LOG_OUT,
  gotUser,
  userLoggedIn,
  userLoggedOut,
} from 'actions';
import { UserManager } from 'oidc-client';


const createOpenIDMiddleware = () => {
  const location = window.location;
  const base = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
  const settings = {
    authority: 'https://accounts.open-to-all.com/auth/realms/OpenToAll',
    client_id: process.env.OPENID_CLIENT_ID,
    response_type: 'id_token token',
    scope: 'openid email roles',

    popup_redirect_uri: `${base}/signin`,

    silent_redirect_uri: `${base}/silent`,
    automaticSilentRenew: true,

    post_logout_redirect_uri: `${base}/signout`,

    filterProtocolClaims: true,
    loadUserInfo: true,
  };

  const genState = () => {
    const str1 = Math.random().toString(36).substring(2, 15);
    const str2 = Math.random().toString(36).substring(2, 15);
    return str1 + str2;
  };

  const mgr = new UserManager(settings);
  /* eslint-disable no-unused-vars */
  const middleware = store => next => (action) => {
  /* eslint-enable no-unused-vars */
    // FIXME: replace action type strings with imported constant vars
    switch (action.type) {
      case LOG_IN:
        mgr.signinPopup({ state: genState() })
          .then(user => next(userLoggedIn(user)));
        break;
      case LOG_OUT:
        mgr.signoutPopup({ state: genState() })
          .then(() => next(userLoggedOut()));
        break;
      case '@@router5/TRANSITION_SUCCESS':
        // TODO: catch errors
        if (action.payload.route.name === 'root.signin') {
          mgr.signinPopupCallback();
        } else if (action.payload.route.name === 'root.silent') {
          mgr.signinSilentCallback();
        } else if (action.payload.route.name === 'root.signout') {
          mgr.signoutPopupCallback();
        }
        break;
      default: {
        // Check if the user is already logged in.
        const { auth } = store.getState();
        if (!auth.user) {
          mgr.getUser()
            .then((user) => { if (user) next(gotUser(user)); });
        }
        break;
      }
    }
    next(action);
  };

  return middleware;
};

export default createOpenIDMiddleware;
