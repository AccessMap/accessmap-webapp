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
}, {
  name: 'root.home',
  path: '/',
}, {
  name: 'root.home.at',
  path: 'at/:lon_:lat_:zoom<.*>z',
  defaultParams: {
    lon: mapConstants.lon,
    lat: mapConstants.lat,
    zoom: mapConstants.zoom,
  },
  encodeParams: locToPath,
  decodeParams: pathToLoc,
}];

export default routes;
