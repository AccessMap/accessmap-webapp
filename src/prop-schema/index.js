import PropTypes from "prop-types";

export const pointFeatureNoProps = PropTypes.shape({
  geometry: PropTypes.shape({
    type: PropTypes.oneOf(["Point"]),
    coordinates: PropTypes.arrayOf(PropTypes.number)
  }),
  type: PropTypes.oneOf(["Feature"])
});

export const pointFeature = properties =>
  PropTypes.shape({
    geometry: PropTypes.shape({
      type: PropTypes.oneOf(["Point"]),
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }),
    properties: PropTypes.shape(properties),
    type: PropTypes.oneOf(["Feature"])
  });

export const lineGeometry = PropTypes.shape({
  type: PropTypes.oneOf(["LineString"]),
  coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
});

export const accessMapSegment = PropTypes.shape({
  type: PropTypes.oneOf(["Feature"]),
  geometry: lineGeometry,
  properties: PropTypes.shape({
    construction: PropTypes.bool,
    cost: PropTypes.number,
    grade: PropTypes.number
  })
});

export const lineFeatureCollection = PropTypes.shape({
  geometry: lineGeometry,
  segments: PropTypes.shape({
    type: PropTypes.oneOf(["FeatureCollection"]),
    features: PropTypes.arrayOf(accessMapSegment)
  })
});

// Route data
export const routeResult = PropTypes.shape({
  code: PropTypes.oneOf([
    "Ok",
    "Error",
    "NoRoute",
    "OriginFarAway",
    "DestinationFarAway",
    "GraphNotReady",
    "SpatialIndexNotReady"
  ]),
  origin: pointFeatureNoProps,
  destination: pointFeatureNoProps,
  routes: PropTypes.arrayOf(lineFeatureCollection),
  waypoints: PropTypes.arrayOf(pointFeatureNoProps)
});
