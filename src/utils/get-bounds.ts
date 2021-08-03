import geoViewport from "@mapbox/geo-viewport";

// TODO: put tilesize in the constants module, it get used a few different places
const TILESIZE = 512;

const getBounds = (lon, lat, zoom, canvasWidth, canvasHeight) => {
  return geoViewport.bounds(
    [lon, lat],
    zoom,
    [canvasWidth, canvasHeight],
    TILESIZE
  );
};

export default getBounds;
