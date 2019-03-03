import bboxPolygon from "@turf/bbox-polygon";
import inside from "@turf/inside";
import getBounds from "utils/get-bounds";
import PointFeature from "utils/point-feature";

const inView = (queryLon, queryLat, centerLon, centerLat, zoom) => {
  const point = PointFeature(queryLon, queryLat);
  const bounds = getBounds(centerLon, centerLat, zoom);

  return inside(point, bboxPolygon(bounds));
};

export default inView;
