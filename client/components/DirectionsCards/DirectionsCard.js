import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardTitle } from 'react-md/src/js/Cards';

const DirectionsCard = (props) => {
  const {
    distance,
    title,
  } = props;

  const subtitle = `${Math.round(distance, 1)} meters`;

  return (
    <Card
      className='directions--step'
    >
      <CardTitle
        title={title}
        subtitle={subtitle}
      />
    </Card>
  );
};

DirectionsCard.propTypes = {
  distance: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default DirectionsCard;
