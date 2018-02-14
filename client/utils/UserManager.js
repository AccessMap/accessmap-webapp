import { createUserManager } from 'redux-oidc';
import { WebStorageStateStore } from 'oidc-client'

const userManagerConfig = {
  client_id: 'test-dev',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
  response_type: 'token id_token',
  scope: 'openid profile offline_access',
  authority: 'https://accounts.open-to-all.com/auth/realms/OpenToAll',
  silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage })
};

const userManager = createUserManager(userManagerConfig);

export default userManager;