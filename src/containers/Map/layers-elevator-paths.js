import React from "react";

import { Layer } from "react-mapbox-gl";

const VISIBLE = 15;

const ElevatorPaths = () => {
  const widthExpression = {
    stops: [[12, 0.3], [16, 2], [22, 20]]
  };

  const elevatorPathFilter = [
    "all",
    ["==", ["get", "subclass"], "footway"],
    ["==", ["get", "elevator"], 1]
  ];

  return (
    <React.Fragment>
      <Layer
        id="elevator-paths-click"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        filter={elevatorPathFilter}
        paint={{
          "line-width": widthExpression,
          "line-opacity": 0
        }}
        before="bridge-street"
      />
      <Layer
        id="elevator-paths"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        filter={elevatorPathFilter}
        paint={{
          "line-color": "#000",
          "line-gap-width": widthExpression,
          "line-width": {
            stops: [[12, 0.1], [16, 0.6], [22, 6]]
          },
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            VISIBLE - 0.5,
            0.0,
            VISIBLE,
            1
          ]
        }}
        before="bridge-street"
      />
    </React.Fragment>
  );
};

export default ElevatorPaths;
