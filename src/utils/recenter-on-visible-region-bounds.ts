import geoViewport from "@mapbox/geo-viewport";

import { Media, Orientation } from "types";
import recenterOnVisibleRegion from "./recenter-on-visible-region";
import { MINZOOM, MAXZOOM, TILESIZE } from "constants/map-canvas";
import { MapView } from "./recenter-on-visible-region";
import getVisibleMargins, { Margins } from "./get-visible-margins";

// Add extra 'padding' to the bounds so that markers, etc aren't covered up by
// elements that cover the map (like the omnicard). Because markers tend to be
// elements that are on 'top' of their location, the top needs more padding
// than the bottom
const PAD_FRACTION_LEFT = 0.1;
const PAD_FRACTION_BOTTOM = 0.0;
const PAD_FRACTION_RIGHT = 0.1;
const PAD_FRACTION_TOP = 0.4;

// TODO: use object-oriented approach to map view manipulations, create
// 'fromBounds' and 'fromLonLat' methods.
const recenterOnVisibleRegionBounds = (
  bounds: [number, number, number, number],
  canvasWidth: number,
  canvasHeight: number,
  mediaType: Media,
  orientation: Orientation,
  addMargins: Margins = null
): MapView => {
  const lon = (bounds[2] + bounds[0]) / 2;
  const lat = (bounds[3] + bounds[1]) / 2;

  // Pad the bounds so that whatever geometry is contained within them is
  // visible
  // NOTE: all of this will probably break across the -180 region of the globe
  const dx = bounds[2] - bounds[0];
  const dy = bounds[3] - bounds[1];
  const paddedBounds = [
    bounds[0] - PAD_FRACTION_LEFT * dx,
    bounds[1] - PAD_FRACTION_BOTTOM * dy,
    bounds[2] + PAD_FRACTION_RIGHT * dx,
    bounds[3] + PAD_FRACTION_TOP * dy,
  ];

  // Create a 'pretend' viewport representing the visible part of the map so
  // that the correct zoom can be calculated.
  const margins = getVisibleMargins(mediaType, orientation);
  if (addMargins !== null) {
    margins.bottom += addMargins.bottom;
    margins.top += addMargins.top;
    margins.left += addMargins.left;
    margins.right += addMargins.right;
  }
  const geoviewportWidth = canvasWidth - (margins.left + margins.right);
  const geoviewportHeight = canvasHeight - (margins.bottom + margins.top);

  const { zoom } = geoViewport.viewport(
    paddedBounds,
    [geoviewportWidth, geoviewportHeight],
    MINZOOM,
    MAXZOOM,
    TILESIZE,
    true
  );

  const mapView = recenterOnVisibleRegion(
    lon,
    lat,
    zoom,
    canvasWidth,
    canvasHeight,
    mediaType,
    orientation,
    addMargins
  );

  return mapView;
};

export default recenterOnVisibleRegionBounds;
