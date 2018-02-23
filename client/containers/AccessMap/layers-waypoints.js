import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MapMarker from 'components/MapMarker';
import { pointFeatureNoProps } from 'prop-schema';


const Waypoints = (props) => {
  const {
    destination,
    origin,
    poi,
  } = props;

  let originComponent = null;
  if (origin) {
    originComponent = (
      <MapMarker
        coordinates={origin.geometry.coordinates}
      />
    );
  }

  let destinationComponent = null;
  if (destination) {
    destinationComponent = (
      <MapMarker
        coordinates={destination.geometry.coordinates}
      />
    );
  }

  let poiComponent = null;
  if (poi) {
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
}

Waypoints.propTypes = {
  destination: pointFeatureNoProps,
  origin: pointFeatureNoProps,
  poi: pointFeatureNoProps,
};


function mapStateToProps(state) {
  const {
    waypoints,
  } = state;

  return {
    destination: waypoints.destination,
    origin: waypoints.origin,
    poi: waypoints.poi,
  };
}


export default connect(
  mapStateToProps,
)(Waypoints);
