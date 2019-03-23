import geoViewport from "@mapbox/geo-viewport";

// TODO: put tilesize in the constants module, it get used a few different places
const TILESIZE = 512;

const getBounds = (lon, lat, zoom) => {
  const map = document.getElementsByClassName("map")[0];
  return geoViewport.bounds(
    [lon, lat],
    zoom,
    [map.clientWidth, map.clientHeight],
    TILESIZE
  );
};

export default getBounds;
