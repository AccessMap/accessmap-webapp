import bboxPolygon from "@turf/bbox-polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import getBounds from "utils/get-bounds";

const inView = (
  queryLon,
  queryLat,
  centerLon,
  centerLat,
  zoom,
  canvasWidth,
  canvasHeight
) => {
  const bounds = getBounds(
    centerLon,
    centerLat,
    zoom,
    canvasWidth,
    canvasHeight
  );

  return booleanPointInPolygon([queryLon, queryLat], bboxPolygon(bounds));
};

export default inView;
