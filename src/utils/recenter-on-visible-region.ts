import { Media, Orientation } from "types";
import getBounds from "./get-bounds";
import getVisibleMargins, { Margins } from "./get-visible-margins";

export interface MapView {
  lon: number;
  lat: number;
  zoom: number;
  bounds: [number, number, number, number];
  canvasWidth: number;
  canvasHeight: number;
}

const recenterOnVisibleRegion = (
  lon: number,
  lat: number,
  zoom: number,
  canvasWidth: number,
  canvasHeight: number,
  mediaType: Media,
  orientation: Orientation,
  addMargins: Margins = null
): MapView => {
  // Assumption is that lon, lat, and zoom would already be correct *if* the
  // uncovered map region were its own 'geoviewport'. Will skip zoom adjustment
  // as this may be manipulated upstream, so the task is to find the lon-lat
  // pair that places the input pair in the center of the visible map region.

  // Note: will be using cartesian-ish logic, which should be "close enough".

  // Determine the map view 'margins': the top/right/bottom/left pixel
  // space taken up by interactive elements overlaid on the map.
  const margins = getVisibleMargins(mediaType, orientation);
  if (addMargins !== null) {
    margins.top += addMargins.top;
    margins.bottom += addMargins.bottom;
    margins.left += addMargins.left;
    margins.right += addMargins.right;
  }

  // Get the dimensions of the pseudo-'geoviewport' in pixels
  const geoviewportWidth = canvasWidth - (margins.left + margins.right);
  const geoviewportHeight = canvasHeight - (margins.bottom + margins.top);

  // Get the center of the pseudo-viewport in pixels
  const geoviewportX = margins.left + geoviewportWidth / 2;
  const geoviewportY = margins.bottom + geoviewportHeight / 2;

  // Get the center of the canvas
  const canvasCenterX = canvasWidth / 2;
  const canvasCenterY = canvasHeight / 2;

  // Get the deltas between the pseudo-viewport center and canvas center
  const geoviewportDeltaX = geoviewportX - canvasCenterX;
  const geoviewportDeltaY = geoviewportY - canvasCenterY;

  // Normalize the deltas as a fraction of the screen
  const geoviewportDeltaFractionX = geoviewportDeltaX / canvasWidth;
  const geoviewportDeltaFractionY = geoviewportDeltaY / canvasHeight;

  // Calculate the lon-lat bounds for the whole map (including covered parts).
  const bounds = getBounds(lon, lat, zoom, canvasWidth, canvasHeight);

  // Calculate the dimensions of the map in lon-lat
  const mapWidth = bounds[2] - bounds[0];
  const mapHeight = bounds[3] - bounds[1];

  // Calculate the lon-lat deltas
  const deltaLon = mapWidth * geoviewportDeltaFractionX;
  const deltaLat = mapHeight * geoviewportDeltaFractionY;

  // Create new whole-map lon-lat from these deltas
  const newLon = lon - deltaLon;
  const newLat = lat - deltaLat;

  return {
    lon: newLon,
    lat: newLat,
    zoom,
    bounds,
    canvasWidth,
    canvasHeight,
  };
};

export default recenterOnVisibleRegion;
