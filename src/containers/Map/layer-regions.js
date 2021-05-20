import React from "react";
import { connect } from "react-redux";

import { Layer } from "react-map-gl";

const RegionsLayer = () => (
  <Layer
    id="regions-outline"
    type="line"
    source="regions"
    source-layer="region"
    paint={{
      "line-color": "#000",
      "line-opacity": 0.9,
      "line-width": ["interpolate", ["linear"], ["zoom"], 8, 2, 22, 20],
      "line-blur": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 22, 10]
    }}
    beforeId="bridge-street"
  />
);

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(RegionsLayer);
