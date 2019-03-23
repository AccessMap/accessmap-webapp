import bbox from "@turf/bbox";

const routeBounds = routeResult => {
  const bounds = bbox({
    type: "Feature",
    geometry: routeResult.routes[0].geometry
  });

  const [ox, oy] = routeResult.origin.geometry.coordinates;
  const [ex, ey] = routeResult.destination.geometry.coordinates;

  bounds[0] = Math.min(bounds[0], ox, ex);
  bounds[1] = Math.min(bounds[1], oy, ey);
  bounds[2] = Math.max(bounds[2], ox, ex);
  bounds[3] = Math.max(bounds[3], oy, ey);

  return bounds;
};

export default routeBounds;
