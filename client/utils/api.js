import store from "../store";

export function loadUserInfo() {
  const url =
    "https://accounts.open-to-all.com/auth/realms/OpenToAll/protocol/openid-connect/userinfo";

  return apiRequest(url).then(result => {
    const note = "Note: If the auth token expires, then you won't be able to " +
      "see the correct user info below. This could be caused by automatic renew " +
      "not working properly in this browser.\n\n";
    alert(note + JSON.stringify(result.data, null, 2));
  });
}

// a request helper which reads the access_token from the redux state and passes it in its HTTP request
function apiRequest(url, method = "GET") {
  const token = store.getState().oidc.user.access_token;
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const options = {
    method,
    headers
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }));
}
