import React from 'react';
import PropTypes from 'prop-types';

import DirectionsCard from './DirectionsCard';

const CrossingCard = (props) => {
  const {
    distance,
    streetName,
  } = props;

  const title = `Cross ${streetName}`;

  return (
    <DirectionsCard
      title={title}
      distance={distance}
    />
  );
};

CrossingCard.propTypes = {
  distance: PropTypes.number,
  streetName: PropTypes.string,
};

CrossingCard.defaultProps = {
  distance: null,
  streetName: '',
};

export default CrossingCard;
