import React from "react";

import { Source } from "react-map-gl";

// FIXME: no longer restricted to set TileJSON from file. Can encode
// here/retrieve from regions.json?
const PedestrianSource = () => (
  <Source id="pedestrian" type="vector" url="/tiles/tilejson/pedestrian.json" />
);

export default PedestrianSource;
