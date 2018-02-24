import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-mapbox-gl';
import PinIcon from 'components/Icons/PinIcon';


export default function MapMarker(props) {
  const {
    coordinates,
    moreProps,
  } = props;

  return (
    <Marker
      className='map-marker'
      coordinates={coordinates}
      anchor='bottom'
      {...moreProps}
    >
      <PinIcon />
    </Marker>
  );
}

MapMarker.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
};
