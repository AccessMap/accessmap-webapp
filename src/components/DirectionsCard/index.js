import React from "react";
import PropTypes from "prop-types";

import Card, { CardTitle, CardText } from "react-md/src/js/Cards";

import units from "constants/units";

const DirectionsCard = props => {
  const { distance, feet, subtitle, title } = props;
  let distanceText = null;
  if (distance) {
    if (feet) {
      distanceText = `${(distance * units.feetPerMeter).toFixed(1)} feet`;
    } else {
      distanceText = `${distance.toFixed(1)} meters`;
    }
  }

  return (
    <Card className="directions--step">
      <CardTitle title={title} subtitle={subtitle} />
      <CardText>{distanceText}</CardText>
    </Card>
  );
};

DirectionsCard.propTypes = {
  distance: PropTypes.number,
  feet: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

DirectionsCard.defaultProps = {
  distance: null,
  feed: false,
  subtitle: ""
};

export default DirectionsCard;
