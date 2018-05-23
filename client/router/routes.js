import mapDefaults from 'constants/map';
import precisionRound from 'utils/precision-round';

const locToPath = (params) => {
  const located = [];
  if ('lon' in params) located.lon = precisionRound(params.lon, 7);
  if ('lat' in params) located.lat = precisionRound(params.lat, 7);
  if ('zoom' in params) located.zoom = precisionRound(params.zoom, 2);
  return { ...params, ...located };
};

const pathToLoc = ({ lon, lat, zoom }) => ({
  lon: precisionRound(lon, 7),
  lat: precisionRound(lat, 7),
  zoom: precisionRound(zoom, 2),
});

const waypointsToPath = (params) => {
  if (!('waypoints' in params)) return params;
  const { waypoints } = params;
  const encoded = [];
  waypoints.forEach((w) => {
    if (w) {
      const lon = precisionRound(w.lon, 7);
      const lat = precisionRound(w.lat, 7);
      encoded.push([lon, lat].join('_'));
    }
  });

  return { ...params, waypoints: encoded.join('\'') };
};

const pathToWaypoints = (path) => {
  const waypoints = path.split('\'').map((w) => {
    const coords = w.split('_').map(c => precisionRound(c, 7));
    return { lon: coords[0], lat: coords[1] };
  });
  return waypoints;
};

// Tree legend: names = nodes, edges = lines, parentheses = view state could be
// outside of URL
//
//
//
// Rough overview of the tree:
//
//                root
//                 |
//         --------+---------
//        /                  \
//      home         planning directions      <-- determined by path level 1
//     /    \                 |  \
// (profile) (legend)         | (profile, geocoding, legend)
//                            |
//                   viewing directions  <-- determined by path level 2
//                            |
//                       -----+-----
//                      /     |     \
//                (profile) (info)  (steps)
//
//
//
// Note: every single view should have a location (lon, lat, zoom). If it
// doesn't, this should trigger a thunk that retrieves it through this logic:
// - If we're in 'home' mode, just grab the defaults
// - If we're in planning trip mode and no waypoints, grab defaults. If one
// waypoint, start at it. If both waypoints, request trip and transition to
// viewing directions.
// - If viewing directions, request trip and transition to viewing directions


const routes = [{
  name: 'root',
  path: '/',
  children: [{
    name: 'home',
    path: '/',
    children: [{
      name: 'at',
      path: 'at!:lon_:lat_:zoom<.*>z?mode',
      defaultParams: {
        lon: mapDefaults.lon,
        lat: mapDefaults.lat,
        zoom: mapDefaults.zoom,
      },
      encodeParams: locToPath,
      decodeParams: pathToLoc,
    }],
  }, {
    name: 'directions',
    path: 'dir',
    children: [{
      name: 'waypoints',
      path: '/wp!:waypoints',
      deParams: params => ({ waypoints: waypointsToPath(params.waypoints) }),
      decodeParams: ({ waypoints }) => ({ waypoints: pathToWaypoints(waypoints) }),
      children: [{
        name: 'at',
        // TODO: query params can't match commas, periods, etc. Instead, use
        // url-parameter-matrix for origin & destination (or just all waypoints)
        // and use custom regex.
        path: '/at!:lon_:lat_:zoom<.*>z?mode',
        defaultParams: {
          lon: mapDefaults.lon,
          lat: mapDefaults.lat,
          zoom: mapDefaults.zoom,
        },
        encodeParams: params => waypointsToPath(locToPath(params)),
        decodeParams: (params) => {
          const located = pathToLoc({ lon: params.lon, lat: params.lat, zoom: params.zoom });
          const waypointsEnc = pathToWaypoints(params.waypoints);
          return { ...params, ...located, waypoints: waypointsEnc };
        },
      }],
    }, {
      name: 'at',
      // TODO: query params can't match commas, periods, etc. Instead, use
      // url-parameter-matrix for origin & destination (or just all waypoints)
      // and use custom regex.
      path: '/at!:lon_:lat_:zoom<.*>z?mode',
      defaultParams: {
        lon: mapDefaults.lon,
        lat: mapDefaults.lat,
        zoom: mapDefaults.zoom,
      },
      encodeParams: params => ({ ...params, ...locToPath(params) }),
      decodeParams: params => ({ ...params, ...pathToLoc(params) }),
    }],
  }],
}];

export default routes;
