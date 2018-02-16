import store from "../store";

export function loadUserInfo() {
  const url =
    "https://accounts.open-to-all.com/auth/realms/OpenToAll/protocol/openid-connect/userinfo";

  return apiRequest(url).then(result => {
    const note = "\n\nNote: If the auth token expires, then you won't be able to " +
      "see the any user info above. This could be caused by automatic renew " +
      "not working properly in this browser.";
    alert(JSON.stringify(result.data, null, 2) + note);
  });
}

export function loadUserProfiles() {
  const url =
    "http://localhost:4040/api/profiles";

  return apiRequest(url);
}

export function deleteUserProfile(profileID) {
  const url =
    `http://localhost:4040/api/profile?profileID=${profileID}`;

  return apiRequest(url, "DELETE");
}

export function updateUserProfile(profileID, newProfile) {
  const url =
    `http://localhost:4040/api/profile?profileID=${profileID}`;

  return apiRequest(url, "POST", newProfile);
}

// a request helper which reads the access_token from the redux state and passes it in its HTTP request
function apiRequest(url, method = "GET", body = undefined) {
  const token = store.getState().oidc.user.access_token;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  return fetch(url, options)
    .then(res => res.json())
    .then(data => ({ data }))
    .catch(error => ({ error }));
}
