import mapConstants from "constants/map";
import precisionRound from "utils/precision-round";

const encodeParams = params => {
  // TODO: Use separate functions for directions mode vs others, put lon/lat/z in its
  // own function
  const encoded = {};
  if (params.lon) {
    encoded.lon = precisionRound(params.lon, 7);
  }
  if (params.lat) {
    encoded.lat = precisionRound(params.lat, 7);
  }
  if (params.z) {
    encoded.z = precisionRound(params.z, 2);
  }
  if (params.waypoints) {
    const waypoints = [];
    params.waypoints.forEach(w => {
      if (w) {
        const lon = precisionRound(w.lon, 7);
        const lat = precisionRound(w.lat, 7);
        waypoints.push([lon, lat].join("_"));
      } else {
        waypoints.push("");
      }
    });
    encoded.waypoints = waypoints.join("'");
  }

  return encoded;
};

const decodeParams = params => {
  const decoded = {};
  if (params.lon) {
    decoded.lon = precisionRound(params.lon, 7);
  }
  if (params.lat) {
    decoded.lat = precisionRound(params.lat, 7);
  }
  if (params.z) {
    decoded.z = precisionRound(params.z, 7);
  }
  if (params.waypoints) {
    let waypoints = [];
    const waypointsArr = params.waypoints.split("'");
    for (let w of waypointsArr) {
      if (w.length === 0) {
        waypoints = null;
        break;
      } else {
        const coords = w.split("_").map(c => precisionRound(c, 7));
        waypoints.push({ lon: coords[0], lat: coords[1] });
      }
    }
    decoded.waypoints = waypoints;
  }

  return decoded;
};

const routes = [
  {
    name: "root",
    path: "/?lon&lat&z",
    defaultParams: {
      lon: mapConstants.lon,
      lat: mapConstants.lat,
      z: mapConstants.zoom
    },
    encodeParams,
    decodeParams
  },
  {
    name: "directions",
    path: "/dir/:waypoints?lon&lat&z",
    encodeParams,
    decodeParams
  },
  {
    name: "signin",
    path: "/signin"
  },
  {
    name: "silent",
    path: "/silent"
  },
  {
    name: "login_callback",
    path: "/login_callback?access_token&refresh_token"
  },
  {
    name: "signout",
    path: "/signout?state"
  }
];

export default routes;
