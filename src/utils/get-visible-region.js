// Note: using geo-viewport from a pull request that allows decimal zooms
import SphericalMercator from "@mapbox/sphericalmercator";

// Size of map tiles, in pixels
const TILESIZE = 512;
// Padding, in pixels, to add around the visible map view. This prevents wide
// things like map markers getting obscured
const PADDING = 64;

const getVisibleRegion = (bounds, margins) => {
  /* Given a bounding box and info about margin sizes (in pixels) that
   * describe map-overlapping elements, create an expanded bounding box that
   * ensures an unobscured view
   */
  const map = document.getElementsByClassName("map")[0];
  const mapWidth = map.clientWidth;
  const mapHeight = map.clientHeight;

  /*
   * Input checking
   */
  margins = margins || {};

  /*
   * Visible region calculations (pixels)
   */

  const mapView = {
    width: mapWidth - margins.left - margins.right,
    height: mapHeight - margins.bottom - margins.top
  };
  const viewAspect = mapView.width / mapView.height;

  /*
   * Interpreting the bounding box in web mercator coordinates
   */

  const sm = new SphericalMercator({ size: TILESIZE });
  const boundsWM = sm.convert(bounds, "900913");
  const dxWM = boundsWM[2] - boundsWM[0];
  const dyWM = boundsWM[3] - boundsWM[1];
  const routeAspect = dxWM / dyWM;

  /*
   * Create an expanded bounding box such that the unobscured map view
   * contains the input bounding box
   */

  let paddingWM;
  let side;
  if (viewAspect > routeAspect) {
    // View aspect is wider, so route will be centered on X axis
    // - expand route west/east bbox to match aspect of view

    // Use the y dim to find the padding
    paddingWM = (dyWM / mapView.height) * PADDING;

    side = (viewAspect * dyWM - dxWM) / 2;
    boundsWM[0] -= side;
    boundsWM[2] += side;
  } else {
    // Route aspect is taller, so route will be centered on Y axis
    // - expand route north/west bbox to match aspect of view
    // Use the x dim to find the padding
    paddingWM = (dxWM / mapView.width) * PADDING;

    side = (dxWM / viewAspect - dyWM) / 2;
    boundsWM[1] -= side;
    boundsWM[3] += side;
  }

  const paddedBoundsWM = [
    boundsWM[0] - paddingWM,
    boundsWM[1] - paddingWM,
    boundsWM[2] + paddingWM,
    boundsWM[3] + paddingWM
  ];

  const dxWMPadded = paddedBoundsWM[2] - paddedBoundsWM[0];
  const dyWMPadded = paddedBoundsWM[3] - paddedBoundsWM[1];

  // Expand to account for the margins

  const ratioX = dxWMPadded / mapView.width;
  const ratioY = dyWMPadded / mapView.height;
  const marginsWM = {
    left: (margins.left + mapView.width) * ratioX - dxWMPadded,
    right: (margins.right + mapView.width) * ratioX - dxWMPadded,
    bottom: (margins.bottom + mapView.height) * ratioY - dyWMPadded,
    top: (margins.top + mapView.height) * ratioY - dyWMPadded
  };

  // Adjust bounds to fit whole map
  const boundsWMFull = [
    paddedBoundsWM[0] - marginsWM.left,
    paddedBoundsWM[1] - marginsWM.bottom,
    paddedBoundsWM[2] + marginsWM.right,
    paddedBoundsWM[3] + marginsWM.top
  ];

  /*
   * Convert to center and zoom
   */

  const finalBounds = sm.convert(boundsWMFull, "WGS84");

  return finalBounds;
};

export default getVisibleRegion;
