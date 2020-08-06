import React from "react";
import { connect } from "react-redux";

import { Layer } from "react-mapbox-gl";

const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [WIDTH_INACCESSIBLE * 2, WIDTH_INACCESSIBLE * 1.5];

const Steps = props => {
  const widthExpression = {
    stops: [
      [12, 0.5],
      [16, 3],
      [22, 30]
    ]
  };
  const isStepExpression = ["==", ["get", "subclass"], "steps"];
  return (
    <React.Fragment>
      <Layer
        id="step-click"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        paint={{
          "line-opacity": 0
        }}
        before="bridge-street"
      />
      <Layer
        id="steps"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        filter={isStepExpression}
        paint={{
          "line-color": "#FFCB47",
          "line-width": {
            stops: [
              [12, WIDTH_INACCESSIBLE / 4],
              [16, WIDTH_INACCESSIBLE],
              [20, WIDTH_INACCESSIBLE * 4]
            ]
          },
          "line-dasharray": {
            stops: [
              [12, [DASH_INACCESSIBLE[0] * 2, DASH_INACCESSIBLE[1] * 4]],
              [14, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 2]],
              [16, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 1.5]]
            ]
          }
        }}
      />
    </React.Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Steps);
