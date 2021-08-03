import React from "react";

import { Source } from "react-map-gl";

const PedestrianSource = () => (
  <Source
    id="pedestrian"
    type="vector"
    url="/tiles/pedestrian/rpc/routing.edges_function_source.json"
  />
);

export default PedestrianSource;
