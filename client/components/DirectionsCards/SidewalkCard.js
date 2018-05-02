import React from 'react';
import PropTypes from 'prop-types';

import DirectionsCard from './DirectionsCard';

const SidewalkCard = (props) => {
  const {
    distance,
    streetName,
    streetSide,
  } = props;

  const title = `Use sidewalk: ${streetSide} of ${streetName}`;

  return (
    <DirectionsCard
      title={title}
      distance={distance}
    />
  );
};

SidewalkCard.propTypes = {
  distance: PropTypes.number,
  streetName: PropTypes.string,
  streetSide: PropTypes.string,
};

SidewalkCard.defaultProps = {
  distance: null,
  streetName: '',
  streetSide: '',
};

export default SidewalkCard;
