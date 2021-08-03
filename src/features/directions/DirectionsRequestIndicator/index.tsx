import React from "react";

import { LinearProgress } from "react-md/src/js/Progress";

import { useAppSelector } from "hooks";

const DirectionsRequestIndicator = () => {
  const { requesting } = useAppSelector((state) => state.directions);

  if (requesting) {
    return (
      <LinearProgress
        id="directions-request-indicator"
        className="directions-request-indicator"
      />
    );
  } else {
    return null;
  }
};

export default DirectionsRequestIndicator;
