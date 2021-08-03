import React from "react";

import { Source } from "react-map-gl";

const RegionSource = () => (
  <Source id="regions" type="vector" url="/tiles/regions/public.regions.json" />
);

export default RegionSource;
