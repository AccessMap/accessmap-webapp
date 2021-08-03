import bbox from "@turf/bbox";

const routeBounds = (routeResult): [number, number, number, number] => {
  // Bounding box of the on-network route path
  const bboxBounds = bbox({
    type: "Feature",
    geometry: routeResult.routes[0].geometry,
  });

  // Coordinates of the origin/destination pair
  const [ox, oy] = routeResult.origin.geometry.coordinates;
  const [ex, ey] = routeResult.destination.geometry.coordinates;

  // Adjust the bounding box to include the origin or destination if they fall
  // outside of the on-network route bounding box.
  return [
    Math.min(bboxBounds[0], ox, ex),
    Math.min(bboxBounds[1], oy, ey),
    Math.max(bboxBounds[2], ox, ex),
    Math.max(bboxBounds[3], oy, ey),
  ];
};

export default routeBounds;
