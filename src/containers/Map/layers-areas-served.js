import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layer } from "react-mapbox-gl";

const AreasServed = props => {
  return (
    <React.Fragment>
      <Layer
        id="areas_served-fill-outline"
        type="line"
        sourceId="areas_served"
        sourceLayer="areas"
        paint={{
          "line-color": "#000",
          "line-opacity": 0.9,
          "line-width": ["interpolate", ["linear"], ["zoom"], 8, 2, 22, 20],
          "line-blur": ["interpolate", ["linear"], ["zoom"], 8, 0.5, 22, 10]
        }}
        before="bridge-street"
      />
    </React.Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AreasServed);
