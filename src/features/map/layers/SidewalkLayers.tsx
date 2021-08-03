import React from "react";

import { Layer } from "react-map-gl";
import { Expression } from "maplibre-gl";

import { uphillColorMap, downhillColorMap } from "colors";

const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [WIDTH_INACCESSIBLE * 4, WIDTH_INACCESSIBLE * 1.5];

interface Props {
  uphillMax: number;
  downhillMax: number;
  speed: number;
  uphillMode: boolean;
}

const SidewalkLayers = ({
  uphillMax,
  downhillMax,
  speed,
  uphillMode = true,
}: Props) => {
  // Pick an odd number so that equal amount on each side of 0
  const nSamples = 15;
  // Scaled from -1 to 1
  const nSide = Math.round(nSamples / 2);
  // TODO: center at ideal incline instead of 0?
  const range = [...Array(nSamples).keys()].map((d) => (d - nSide) / nSide);

  let inclineSamples;
  let colorMap;
  if (uphillMode) {
    // Scaled 0 -> uphillMax
    inclineSamples = range.map((d) => d * uphillMax);
    colorMap = uphillColorMap(uphillMax, downhillMax, speed);
  } else {
    // Scaled 0 -> downhillMax
    inclineSamples = range.map((d) => d * -downhillMax);
    colorMap = downhillColorMap(uphillMax, downhillMax, speed);
  }

  const inclineStops = [];
  inclineSamples.map((d) => {
    const color = colorMap(d);
    inclineStops.push(d);
    inclineStops.push(color.hex());
  });

  // Set bounds for when elevations become 'too steep' on display.
  const boundMax = uphillMode ? uphillMax : -downhillMax;
  const boundMin = uphillMode ? -uphillMax : downhillMax;

  // Expressions
  const widthExpression: Expression = [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    0.1,
    16,
    5,
    20,
    24,
  ];

  const isSidewalkExpression = ["==", ["get", "footway"], "sidewalk"];

  const accessibleExpression = [
    "case",
    [">", ["to-number", ["get", "incline"]], boundMax],
    false,
    ["<", ["to-number", ["get", "incline"]], boundMin],
    false,
    true,
  ];

  const accessibleSidewalkExpression = [
    "all",
    isSidewalkExpression,
    accessibleExpression,
  ];
  const inaccessibleSidewalkExpression = [
    "all",
    isSidewalkExpression,
    ["!", accessibleExpression],
  ];

  return (
    <>
      <Layer
        id="sidewalk-click"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        filter={accessibleSidewalkExpression}
        paint={{
          "line-width": widthExpression,
          "line-opacity": 0,
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="sidewalk-outline"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        layout={{ "line-cap": "round" }}
        filter={accessibleSidewalkExpression}
        paint={{
          "line-color": "#000",
          "line-width": {
            stops: [
              [14, 0.0],
              [20, 1],
            ],
          },
          "line-opacity": {
            stops: [
              [13.5, 0.0],
              [16, 1],
            ],
          },
          "line-gap-width": widthExpression,
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="sidewalk-inaccessible"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        filter={inaccessibleSidewalkExpression}
        paint={{
          "line-color": "#ff0000",
          "line-dasharray": [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 2],
          "line-width": [
            "interpolate",
            ["linear"],
            ["zoom"],
            12,
            WIDTH_INACCESSIBLE / 4,
            16,
            WIDTH_INACCESSIBLE,
            20,
            WIDTH_INACCESSIBLE * 4,
          ],
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="sidewalk"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        layout={{ "line-cap": "round" }}
        filter={accessibleSidewalkExpression}
        paint={{
          "line-color": [
            "case",
            [">", ["to-number", ["get", "incline"]], boundMax],
            "#ff0000",
            ["<", ["to-number", ["get", "incline"]], boundMin],
            "#ff0000",
            [
              "interpolate",
              ["linear"],
              ["to-number", ["get", "incline"]],
              ...inclineStops,
            ],
          ],
          "line-color-transition": { duration: 0 },
          "line-width": widthExpression,
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="sidewalk-downhill-arrow"
        type="symbol"
        source="pedestrian"
        source-layer="transportation"
        minzoom={16}
        filter={accessibleSidewalkExpression}
        layout={{
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-image": [
            "case",
            [
              ">",
              [
                "case",
                ["<", ["to-number", ["get", "incline"]], 0],
                ["*", -1, ["to-number", ["get", "incline"]]],
                ["to-number", ["get", "incline"]],
              ],
              Math.abs((inclineStops[0] + inclineStops[2]) / 2),
            ],
            "direction-arrow-white",
            "direction-arrow",
          ],
          "icon-rotate": [
            "case",
            [">=", ["to-number", ["get", "incline"]], 0],
            270,
            90,
          ],
          "icon-size": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16,
            0.1,
            18,
            0.3,
            20,
            0.4,
          ],
          "symbol-placement": "line",
          "icon-padding": 0,
          "symbol-spacing": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16,
            50,
            20,
            200,
          ],
        }}
        paint={{
          "icon-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            16,
            0.0,
            16.25,
            0.9,
          ],
        }}
        beforeId="bridge-street"
      />
    </>
  );
};

export default SidewalkLayers;
