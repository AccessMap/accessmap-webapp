import regions from "constants/regions";
import precisionRound from "utils/precision-round";

// Default region is the first one - Seattle right now.
// TODO: make this configurable via the URL, e.g. ?region=""?
const defaultRegion = regions.features[0];

const encodeParams = params => {
  // TODO: Use separate functions for directions mode vs others, put lon/lat/z in its
  // own function
  const encoded = {};
  if (params.region) {
    encoded.region = params.region;
  }
  if (params.lon) {
    encoded.lon = precisionRound(params.lon, 7);
  }
  if (params.lat) {
    encoded.lat = precisionRound(params.lat, 7);
  }
  if (params.z) {
    encoded.z = precisionRound(params.z, 2);
  }
  if (params.wp) {
    const waypoints = [];
    params.wp.forEach(w => {
      if (w) {
        const lon = precisionRound(w.lon, 7);
        const lat = precisionRound(w.lat, 7);
        waypoints.push([lon, lat].join("_"));
      } else {
        waypoints.push("");
      }
    });
    encoded.wp = waypoints.join("'");
  }

  return encoded;
};

const decodeParams = params => {
  const decoded = {};
  if (params.region) {
    decoded.region = params.region;
  }
  if (params.lon) {
    decoded.lon = precisionRound(params.lon, 7);
  }
  if (params.lat) {
    decoded.lat = precisionRound(params.lat, 7);
  }
  if (params.z) {
    decoded.z = precisionRound(params.z, 7);
  }
  if (params.wp) {
    let waypoints = [];
    const waypointsArr = params.wp.split("'");
    for (let w of waypointsArr) {
      if (w.length === 0) {
        waypoints = null;
        break;
      } else {
        const coords = w.split("_").map(c => precisionRound(c, 7));
        waypoints.push({ lon: coords[0], lat: coords[1] });
      }
    }
    decoded.wp = waypoints;
  }

  return decoded;
};

const routes = [
  {
    name: "404",
    path: "/404"
  },
  {
    name: "root",
    path: "/?region&lon&lat&z",
    defaultParams: {
      region: defaultRegion.properties.key,
      lon: defaultRegion.properties.lon,
      lat: defaultRegion.properties.lat,
      z: defaultRegion.properties.zoom
    },
    encodeParams,
    decodeParams
  },
  {
    name: "directions",
    path: "/dir?wp&lon&lat&z",
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
