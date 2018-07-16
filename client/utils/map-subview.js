// Note: using geo-viewport from a pull request that allows decimal zooms
import geoViewport from '@mapbox/geo-viewport';
import getVisibleRegion from './get-visible-region';

// Size of map tiles, in pixels
const TILESIZE = 512;
// Map zoom parameters. These restricted final zoom
const MINZOOM = 0;
const MAXZOOM = 22;

const mapSubview = (bounds, margins) => {
  const visibleBounds = getVisibleRegion(bounds, margins);
  const map = document.getElementsByClassName('map')[0];

  const { center, zoom } = geoViewport.viewport(
    visibleBounds,
    [map.clientWidth, map.clientHeight],
    MINZOOM,
    MAXZOOM,
    TILESIZE,
    true,
  );

  return {
    center,
    zoom,
  };
};

export default mapSubview;
