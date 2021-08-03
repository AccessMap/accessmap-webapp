import { Feature, Point } from "geojson";

export default (
  lon: number,
  lat: number,
  properties: object = {}
): Feature<Point> => {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lon, lat],
    },
    properties: properties,
  };
};
