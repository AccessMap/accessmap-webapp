import React from "react";
import PropTypes from "prop-types";

import DirectionsCard from "./DirectionsCard";

const ElevatorPathCard = props => {
  const { distance, indoor, via } = props;

  let title = "Use elevator";
  if (via) {
    title += indoor ? ` in ${via}` : ` via ${via}`;
  }

  return <DirectionsCard title={title} distance={distance} />;
};

ElevatorPathCard.propTypes = {
  distance: PropTypes.number,
  indoor: PropTypes.number.isRequired,
  via: PropTypes.string
};

ElevatorPathCard.defaultProps = {
  distance: null,
  via: ""
};

export default ElevatorPathCard;
