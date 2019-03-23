// Load a user's account profile
// TODO: promisify
export const loadUser = (accessToken, callback) => {
  // Retrieve user's profile
  fetch("/api/v1/user/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(json => {
      const userID = json.user_id;
      const displayName = json.display_name;
      callback(null, userID, displayName);
    })
    .catch(err => callback(err));
};

// Load a user's routing profile
export const loadProfile = (jwt, callback) => {
  // Retrieve user's profile
  fetch("/api/v1/profiles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(json => {
      callback(null, json.profiles[0]);
    })
    .catch(err => callback(err));
};

export const saveProfile = (profile, accessToken, callback) => {
  // Retrieve user's profile
  fetch("/api/v1/profiles", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uphill_max: profile.uphillMax,
      downhill_max: profile.downhillMax,
      avoid_curbs: profile.avoidCurbs
    })
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(() => {
      callback(null);
    })
    .catch(err => callback(err));
};

export const refresh = (refreshToken, callback) => {
  fetch("/api/v1/auth/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer  ${refreshToken}`
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(json => {
      callback(null, json.access_token);
    })
    .catch(err => callback(err));
};
