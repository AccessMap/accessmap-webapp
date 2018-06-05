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
        mgr.signinPopup({ state: 'accessmap-web-login' }).then(user => console.log(user));
        break;
      case '@@router5/TRANSITION_SUCCESS':
        if (action.payload.route.name === 'root.signin') {
          mgr.signinPopupCallback();
        } else if (action.payload.route.name === 'root.silent') {
          mgr.signinSilentCallback().then(() => {
            mgr.getUser().then(u => console.log(u.expires_in));
          });
        }
        break;
      default:
        break;
    }
    next(action);
  };

  return middleware;
};

export default createOpenIDMiddleware;
