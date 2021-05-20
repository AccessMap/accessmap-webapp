import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MapMarker from "components/MapMarker";
import { pointFeatureNoProps } from "prop-schema";
import pointFeature from "utils/point-feature";

const Waypoints = props => {
  const { destination, origin, poi, selectedFeature } = props;

  let originComponent = null;
  if (origin) {
    originComponent = (
      <MapMarker
        lon={origin.geometry.coordinates[0]}
        lat={origin.geometry.coordinates[1]}
        label="A"
      />
    );
  }

  let destinationComponent = null;
  if (destination) {
    destinationComponent = (
      <MapMarker
        lon={destination.geometry.coordinates[0]}
        lat={destination.geometry.coordinates[1]}
        label="B"
      />
    );
  }

  let poiComponent = null;
  if (selectedFeature) {
    poiComponent = (
      <MapMarker
        lon={selectedFeature.location[0]}
        lat={selectedFeature.location[1]}
      />
    );
  } else if (poi) {
    poiComponent = (
      <MapMarker
        lon={poi.geometry.coordinates[0]}
        lat={poi.geometry.coordinates[1]}
      />
    );
  }

  return (
    <>
      {originComponent}
      {destinationComponent}
      {poiComponent}
    </>
  );
};

Waypoints.propTypes = {
  destination: pointFeatureNoProps,
  origin: pointFeatureNoProps,
  poi: pointFeatureNoProps,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
    properties: PropTypes.object
  })
};

Waypoints.defaultProps = {
  destination: null,
  origin: null,
  poi: null,
  selectedFeature: null
};

const mapStateToProps = state => {
  const { map, waypoints } = state;

  const selectedWaypoints = {};
  Object.entries(waypoints).forEach(([key, value]) => {
    if (value) {
      selectedWaypoints[key] = pointFeature(value.lon, value.lat, value.name);
    } else {
      selectedWaypoints[key] = null;
    }
  });

  const { poi, origin, destination } = selectedWaypoints;

  return {
    destination,
    origin,
    poi,
    selectedFeature: map.selectedFeature
  };
};

export default connect(mapStateToProps)(Waypoints);
