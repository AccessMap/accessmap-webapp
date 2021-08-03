import React from "react";

import { Layer } from "react-map-gl";

const RegionsLayers = () => (
  <>
    <Layer
      id="regions-mask"
      type="fill"
      source="regions-mask"
      paint={{
        "fill-pattern": "unsupported-area",
        "fill-opacity": 0.6,
      }}
    />
    <Layer
      id="regions-outline"
      type="line"
      source="regions-mask"
      paint={{
        "line-color": "#000",
        "line-opacity": 0.5,
        "line-width": 3,
      }}
    />
  </>
);

export default RegionsLayers;
