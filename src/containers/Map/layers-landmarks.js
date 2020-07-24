import React from "react";
import { connect } from "react-redux";

import { Layer } from "react-mapbox-gl";

const Landmarks = props => {
  return (
    <React.Fragment>
      <Layer
        id="landmark-click"
        type="circle"
        sourceId="pedestrian"
        sourceLayer="barriers"
        paint={{
          "circle-opacity": 0
        }}
        before="bridge-street"
      />
      <Layer
        id="landmarks"
        type="circle"
        sourceId="pedestrian"
        sourceLayer="barriers"
        paint={{
          "circle-color": "#3D518C",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1.5,
          "circle-radius": 4
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Landmarks);
