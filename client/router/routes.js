import mapConstants from 'constants/map';
import precisionRound from 'utils/precision-round';

const locToPath = ({ lon, lat, zoom }) => ({
  lon: precisionRound(lon, 7),
  lat: precisionRound(lat, 7),
  zoom: precisionRound(zoom, 2),
});

const pathToLoc = ({ lon, lat, zoom }) => ({
  lon: precisionRound(lon, 7),
  lat: precisionRound(lat, 7),
  zoom: precisionRound(zoom, 2),
});

const waypointsToPath = (waypoints) => {
  if (!waypoints) return undefined;
  const encoded = [];
  waypoints.forEach((w) => {
    if (w) {
      const lon = precisionRound(w.lon, 7);
      const lat = precisionRound(w.lat, 7);
      encoded.push([lon, lat].join('_'));
    }
  });

  return encoded.join('\'');
};

const pathToWaypoints = (path) => {
  const waypoints = path.split('\'').map((w) => {
    const coords = w.split('_').map(c => precisionRound(c, 7));
    return { lon: coords[0], lat: coords[1] };
  });
  return waypoints;
};


const routes = [{
  name: 'root',
  path: '/',
  forwardTo: 'root.home',
  children: [{
    name: 'home',
    path: '/',
    children: [{
      name: 'at',
      path: 'at:lon_:lat_:zoom<.*>z',
      defaultParams: {
        lon: mapConstants.lon,
        lat: mapConstants.lat,
        zoom: mapConstants.zoom,
      },
      encodeParams: locToPath,
      decodeParams: pathToLoc,
    }],
  }, {
    name: 'directions',
    path: 'dir',
    children: [{
      name: 'waypoints',
      path: '/wp:waypoints',
      deParams: params => ({ waypoints: waypointsToPath(params.waypoints) }),
      decodeParams: ({ waypoints }) => ({ waypoints: pathToWaypoints(waypoints) }),
      children: [{
        name: 'at',
        // TODO: query params can't match commas, periods, etc. Instead, use
        // url-parameter-matrix for origin & destination (or just all waypoints)
        // and use custom regex.
        path: '/at:lon_:lat_:zoom<.*>z',
        defaultParams: {
          lon: mapConstants.lon,
          lat: mapConstants.lat,
          zoom: mapConstants.zoom,
        },
        encodeParams: (params) => {
          const located = locToPath({ lon: params.lon, lat: params.lat, zoom: params.zoom });
          const waypointsEnc = waypointsToPath(params.waypoints);
          return { ...located, waypoints: waypointsEnc };
        },
        decodeParams: (params) => {
          const located = pathToLoc({ lon: params.lon, lat: params.lat, zoom: params.zoom });
          const waypointsEnc = pathToWaypoints(params.waypoints);
          return { ...located, waypoints: waypointsEnc };
        },
      }],
    }, {
      name: 'at',
      // TODO: query params can't match commas, periods, etc. Instead, use
      // url-parameter-matrix for origin & destination (or just all waypoints)
      // and use custom regex.
      path: '/at:lon_:lat_:zoom<.*>z',
      defaultParams: {
        lon: mapConstants.lon,
        lat: mapConstants.lat,
        zoom: mapConstants.zoom,
      },
      encodeParams: locToPath,
      decodeParams: pathToLoc,
    }],
  }, {
    name: 'signin',
    path: 'signin',
  }, {
    name: 'silent',
    path: 'silent',
  }, {
    name: 'signout',
    path: 'signout?state',
  }],
}];

export default routes;
