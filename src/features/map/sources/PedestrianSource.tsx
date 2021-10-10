import React from "react";

import { Source } from "react-map-gl";

const PedestrianSource = () => (
  <Source id="pedestrian" type="vector" url="/tiles/tilejson/pedestrian.json" />
);

export default PedestrianSource;
