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

const routes = [{
  name: 'root',
  path: '/',
  forwardTo: 'root.home',
  children: [{
    name: 'home',
    path: '/',
    children: [{
      name: 'at',
      path: 'at/:lon_:lat_:zoom<.*>z',
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
    path: '/dir',
    children: [{
      name: 'at',
      path: '/at/:lon_:lat_:zoom<.*>z?origin&destination',
      defaultParams: {
        lon: mapConstants.lon,
        lat: mapConstants.lat,
        zoom: mapConstants.zoom,
      },
      encodeParams: (params) => {
        // Process lat/lon/zoom
        const { lon, lat, zoom } = params;
        const located = locToPath({ lon, lat, zoom });

        // Process origin and/or destination
        const { origin, destination } = params;
        let originEncoded;
        if (params.origin !== undefined && params.origin !== null) {
          const oLon = precisionRound(origin.lon, 7);
          const oLat = precisionRound(origin.lat, 7);
          originEncoded = [oLon, oLat].join(',');
        }

        let destinationEncoded;
        if (params.destination !== undefined && params.destination !== null) {
          const dLon = precisionRound(destination.lon, 7);
          const dLat = precisionRound(destination.lat, 7);
          destinationEncoded = [dLon, dLat].join(',');
        }

        return {
          ...located,
          origin: originEncoded,
          destination: destinationEncoded,
        };
      },
      decodeParams: pathToLoc,
    }],
  }],
}];

export default routes;
