import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { GeoJSONLayer } from 'react-mapbox-gl';


const Geolocation = (props) => {
  const {
    geolocation,
  } = props;

  const geolocationFc = {
    type: 'FeatureCollection',
    features: []
  };
  let geolocationRadius = 0;

  if (geolocation && geolocation.status === 'Ok') {
    geolocationFc.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: geolocation.coordinates
      },
      properties: {}
    });
    geolocationRadius = (
      geolocation.accuracy /
      0.075 /
      Math.cos(
        (geolocation.coordinates[1] *
         Math.PI) /
        180
      )
    );
  }

  return (
    <React.Fragment>
      <GeoJSONLayer
        data={geolocationFc}
        id='geolocation-outline'
        key='geolocation-outline'
        circlePaint={{
          'circle-radius': {
            stops: [
              [0, 0],
              [20, geolocationRadius]
            ],
            base: 2
          },
          'circle-color': '#007cbf',
          'circle-opacity': 0.2
        }}
      />
      <GeoJSONLayer
        data={geolocationFc}
        id='geolocation'
        key='geolocation'
        circlePaint={{
          'circle-radius': 8,
          'circle-color': '#007cbf',
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }}
      />
    </React.Fragment>
  );
}

Geolocation.propTypes = {
  geolocation: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number),
    accuracy: PropTypes.number,
    status: PropTypes.oneOf([
      'Ok',
      'none',
      'unavailable',
    ])
  }),
};


function mapStateToProps(state) {
  const {
    geolocation,
  } = state;

  return {
    geolocation,
  };
}


export default connect(
  mapStateToProps,
)(Geolocation);
