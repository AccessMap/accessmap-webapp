import React from "react";

import { Source } from "react-mapbox-gl";

const Sources = () => (
  <React.Fragment>
    <Source
      id="accessmap"
      tileJsonSource={{
        type: "vector",
        url: "/tiles/tilejson/accessmap.json"
      }}
    />
  </React.Fragment>
);

export default Sources;
