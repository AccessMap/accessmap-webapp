import React from "react";

import { Expression } from "maplibre-gl";
import { Layer } from "react-map-gl";

const CROSSINGS_VISIBLE = 15;
const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [WIDTH_INACCESSIBLE * 2, WIDTH_INACCESSIBLE * 1.5];

interface Props {
  avoidCurbs: boolean;
}

const CrossingsLayers = ({ avoidCurbs }: Props) => {
  const widthExpression: Expression = [
    "interpolate",
    ["linear"],
    ["zoom"],
    12,
    0.5,
    16,
    3,
    22,
    30,
  ];

  const isCrossingExpression = ["==", ["get", "footway"], "crossing"];

  const inaccessibleExpression = [
    "all",
    isCrossingExpression,
    avoidCurbs,
    ["!", ["to-boolean", ["get", "curbramps"]]],
  ];

  const markedExpression = [
    "all",
    isCrossingExpression,
    ["!", inaccessibleExpression],
    ["==", ["get", "crossing"], "marked"],
  ];

  const notnecessarilymarkedExpression = [
    "all",
    isCrossingExpression,
    ["!", inaccessibleExpression],
    [
      "any",
      ["==", ["get", "crossing"], "unmarked"],
      ["!", ["has", "crossing"]],
    ],
  ];

  return (
    <>
      <Layer
        id="crossing-click"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        paint={{
          "line-width": widthExpression,
          "line-opacity": 0,
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="crossing-inaccessible"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        filter={inaccessibleExpression}
        paint={{
          "line-color": "#ff0000",
          // TODO: line-dasharray does not accept interpolation expressions.
          // We should contribute upstream to add this functionality.
          "line-dasharray": [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 2],
          "line-width": {
            stops: [
              [12, WIDTH_INACCESSIBLE / 4],
              [16, WIDTH_INACCESSIBLE],
              [20, WIDTH_INACCESSIBLE * 4],
            ],
          },
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            CROSSINGS_VISIBLE - 0.5,
            0.0,
            CROSSINGS_VISIBLE,
            1,
          ],
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="crossing-unmarked"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        filter={notnecessarilymarkedExpression}
        paint={{
          "line-color": "#555",
          "line-gap-width": widthExpression,
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            CROSSINGS_VISIBLE - 0.5,
            0.0,
            CROSSINGS_VISIBLE,
            1,
          ],
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="crossing-marked-background"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        layout={{ "line-cap": "round" }}
        filter={markedExpression}
        paint={{
          "line-color": "#555",
          "line-width": widthExpression,
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            CROSSINGS_VISIBLE - 0.5,
            0.0,
            CROSSINGS_VISIBLE,
            1,
          ],
        }}
        beforeId="bridge-street"
      />
      <Layer
        id="crossing-marked-outline"
        type="line"
        source="pedestrian"
        source-layer="transportation"
        layout={{ "line-cap": "round" }}
        filter={markedExpression}
        paint={{
          "line-color": "#fff",
          "line-gap-width": {
            stops: [
              [12, 0.4],
              [16, 1.5],
              [22, 15],
            ],
          },
          "line-width": {
            stops: [
              [12, 0.1],
              [16, 0.5],
              [22, 4],
            ],
          },
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            CROSSINGS_VISIBLE - 0.5,
            0.0,
            CROSSINGS_VISIBLE,
            1,
          ],
        }}
        beforeId="bridge-street"
      />
    </>
  );
};

export default CrossingsLayers;
