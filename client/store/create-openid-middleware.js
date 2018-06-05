import { gotUser, userLoggedIn } from 'actions';
import { UserManager } from 'oidc-client';

const createOpenIDMiddleware = () => {
  const location = window.location;
  const base = `${location.protocol}//${location.hostname}${location.port ? `:${location.port}` : ''}`;
  const settings = {
    authority: 'https://accounts.open-to-all.com/auth/realms/OpenToAll',
    client_id: 'test-dev',
    response_type: 'id_token token',
    scope: 'openid email roles',

    popup_redirect_uri: `${base}/signin`,

    silent_redirect_uri: `${base}/silent`,
    automaticSilentRenew: true,

    filterProtocolClaims: true,
    loadUserInfo: true,
  };

  const mgr = new UserManager(settings);
  /* eslint-disable no-unused-vars */
  const middleware = store => next => (action) => {
  /* eslint-enable no-unused-vars */
    // FIXME: replace action type strings with imported constant vars
    switch (action.type) {
      case 'LOGIN':
        mgr.signinPopup({ state: 'accessmap-web-login' })
          .then(user => next(userLoggedIn(user)));
        break;
      case '@@router5/TRANSITION_SUCCESS':
        // TODO: catch errors
        if (action.payload.route.name === 'root.signin') {
          mgr.signinPopupCallback();
        } else if (action.payload.route.name === 'root.silent') {
          mgr.signinSilentCallback();
        }
        break;
      // TODO: on app load / various actions, refresh user session (silent renewal)
      default: {
        // Check if the user is already logged in. If so and store has no user data,
        // dispatch user refresh action
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
