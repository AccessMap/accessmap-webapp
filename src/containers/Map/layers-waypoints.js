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
      <MapMarker coordinates={origin.geometry.coordinates} label="A" />
    );
  }

  let destinationComponent = null;
  if (destination) {
    destinationComponent = (
      <MapMarker coordinates={destination.geometry.coordinates} label="B" />
    );
  }

  let poiComponent = null;
  if (selectedFeature) {
    poiComponent = <MapMarker coordinates={selectedFeature.location} />;
  } else if (poi) {
    poiComponent = <MapMarker coordinates={poi.geometry.coordinates} />;
  }

  return (
    <React.Fragment>
      {originComponent}
      {destinationComponent}
      {poiComponent}
    </React.Fragment>
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
