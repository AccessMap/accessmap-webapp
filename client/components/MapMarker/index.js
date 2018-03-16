import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-mapbox-gl';
import PinIcon from 'components/Icons/PinIcon';


const MapMarker = (props) => {
  const {
    coordinates,
    label,
    ...moreProps
  } = props;

  return (
    <Marker
      className='map-marker'
      coordinates={coordinates}
      anchor='bottom'
      style={{ zIndex: 1 }}
      {...moreProps}
    >
      <div>
        <PinIcon />
        <div className='pin-label'>
          {label}
        </div>
      </div>
    </Marker>
  );
};

MapMarker.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string,
};

MapMarker.defaultProps = {
  label: null,
};

export default MapMarker;
