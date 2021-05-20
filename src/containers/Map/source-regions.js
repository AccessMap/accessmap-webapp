import React from "react";

import { Source } from "react-map-gl";

const RegionSource = () => (
  <Source id="regions" type="vector" url="/tiles/tilejson/regions.json" />
);

export default RegionSource;
