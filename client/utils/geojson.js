const PointFeature = (lng, lat, properties) => {
  const props = properties === undefined ? {} : properties;
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat],
    },
    properties: props,
  };
};

export default PointFeature;
