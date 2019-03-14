import bboxPolygon from "@turf/bbox-polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import getBounds from "utils/get-bounds";
import PointFeature from "utils/point-feature";

const inView = (queryLon, queryLat, centerLon, centerLat, zoom) => {
  const point = PointFeature(queryLon, queryLat);
  const bounds = getBounds(centerLon, centerLat, zoom);

  return booleanPointInPolygon(point, bboxPolygon(bounds));
};

export default inView;
