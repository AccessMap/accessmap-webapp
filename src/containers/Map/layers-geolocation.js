import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layer, Source } from "react-map-gl";

const Geolocation = props => {
  const { geolocation } = props;

  const geolocationFc = {
    type: "FeatureCollection",
    features: []
  };
  let geolocationRadius = 0;

  if (geolocation && geolocation.status === "Ok") {
    geolocationFc.features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: geolocation.coordinates
      },
      properties: {}
    });
    geolocationRadius =
      geolocation.accuracy /
      0.075 /
      Math.cos((geolocation.coordinates[1] * Math.PI) / 180);
  }

  return (
    <Source id="geolocation" type="geojson" data={geolocationFc}>
      <Layer
        type="circle"
        id="geolocation-outline"
        key="geolocation-outline"
        paint={{
          "circle-radius": {
            stops: [[0, 0], [20, geolocationRadius]],
            base: 2
          },
          "circle-color": "#007cbf",
          "circle-opacity": 0.2
        }}
      />
      <Layer
        type="circle"
        id="geolocation"
        key="geolocation"
        paint={{
          "circle-radius": 8,
          "circle-color": "#007cbf",
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff"
        }}
      />
    </Source>
  );
};

Geolocation.propTypes = {
  geolocation: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number),
    accuracy: PropTypes.number,
    status: PropTypes.oneOf(["Ok", "none", "unavailable"])
  })
};

Geolocation.defaultProps = {
  geolocation: null
};

const mapStateToProps = state => ({
  geolocation: state.geolocation
});

export default connect(mapStateToProps)(Geolocation);
