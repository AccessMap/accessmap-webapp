import React from "react";

import { Layer } from "react-mapbox-gl";

// TODO: put the code for this icon in its own module
/* eslint-disable import/no-webpack-loader-syntax */
import directionArrowURL from "!file-loader!images/direction-arrow.png";
import directionArrowWhiteURL from "!file-loader!images/direction-arrow-white.png";
/* eslint-enable import/no-webpack-loader-syntax */

const directionArrow = new Image();
directionArrow.src = directionArrowURL;
directionArrow.height = 48;
directionArrow.width = 24;

const directionArrowWhite = new Image();
directionArrowWhite.src = directionArrowWhiteURL;
directionArrowWhite.height = 48;
directionArrowWhite.width = 24;

const Footways = () => {
  // Expressions
  const widthExpression = [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    0.1,
    16,
    5,
    20,
    24
  ];

  // const isFootwayExpression = ["==", ["get", "subclass"], "footway"];
  const isFootwayExpression = [
    "all",
    ["==", ["get", "subclass"], "footway"],
    ["!=", ["get", "footway"], "sidewalk"],
    ["!=", ["get", "footway"], "crossing"]
  ];

  return (
    <React.Fragment>
      <Layer
        id="footway-click"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        filter={isFootwayExpression}
        paint={{
          "line-width": widthExpression,
          "line-opacity": 0
        }}
        before="bridge-street"
      />
      <Layer
        id="footway-outline"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        layout={{ "line-cap": "round" }}
        filter={isFootwayExpression}
        paint={{
          "line-color": "#000",
          "line-width": {
            stops: [[14, 0.0], [20, 1]]
          },
          "line-opacity": {
            stops: [[13.5, 0.0], [16, 1]]
          },
          "line-gap-width": widthExpression
        }}
        before="bridge-street"
      />
      <Layer
        id="footway"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        layout={{ "line-cap": "round" }}
        filter={isFootwayExpression}
        paint={{
          "line-color": "#cccccc",
          "line-width": widthExpression
        }}
        before="bridge-street"
      />
    </React.Fragment>
  );
};

export default Footways;
