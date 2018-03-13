import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MapMarker from 'components/MapMarker';
import { pointFeatureNoProps } from 'prop-schema';


const Waypoints = (props) => {
  const {
    destination,
    origin,
    planningTrip,
    poi,
    selectedFeature,
  } = props;

  let originComponent = null;
  if (origin) {
    originComponent = (
      <MapMarker
        coordinates={origin.geometry.coordinates}
        label='A'
      />
    );
  }

  let destinationComponent = null;
  if (destination) {
    destinationComponent = (
      <MapMarker
        coordinates={destination.geometry.coordinates}
        label='B'
      />
    );
  }

  let poiComponent = null;
  if (!planningTrip && selectedFeature) {
    poiComponent = (
      <MapMarker
        coordinates={selectedFeature.location}
      />
    );
  } else if (!planningTrip && poi) {
    poiComponent = (
      <MapMarker
        coordinates={poi.geometry.coordinates}
      />
    );
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
  planningTrip: PropTypes.bool,
  poi: pointFeatureNoProps,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    properties: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.tring,
    })),
    location: PropTypes.arrayOf(PropTypes.number),
  }),
};

Waypoints.defaultProps = {
  destination: null,
  origin: null,
  planningTrip: false,
  poi: null,
  selectedFeature: null,
};

const mapStateToProps = (state) => {
  const {
    activities,
    map,
    waypoints,
  } = state;

  return {
    destination: waypoints.destination,
    origin: waypoints.origin,
    planningTrip: activities.planningTrip,
    poi: waypoints.poi,
    selectedFeature: map.selectedFeature,
  };
};

export default connect(
  mapStateToProps,
)(Waypoints);
