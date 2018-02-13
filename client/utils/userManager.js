import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  client_id: 'accessmap-webapp-dev',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile offline_access',
  authority: 'https://accounts.open-to-all.com/auth/realms/OpenToAll',
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;