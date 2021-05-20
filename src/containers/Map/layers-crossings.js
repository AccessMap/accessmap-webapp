import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layer } from "react-map-gl";

import { defaultProfiles } from "profiles";

const CROSSINGS_VISIBLE = 15;
const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [WIDTH_INACCESSIBLE * 2, WIDTH_INACCESSIBLE * 1.5];

const Crossings = props => {
  const { avoidCurbs } = props;

  const widthExpression = {
    stops: [[12, 0.5], [16, 3], [22, 30]]
  };

  const isCrossingExpression = ["==", ["get", "footway"], "crossing"];

  const inaccessibleExpression = [
    "all",
    isCrossingExpression,
    avoidCurbs,
    ["!", ["to-boolean", ["get", "curbramps"]]]
  ];

  const markedExpression = [
    "all",
    isCrossingExpression,
    ["!", inaccessibleExpression],
    ["==", ["get", "crossing"], "marked"]
  ];

  const notnecessarilymarkedExpression = [
    "all",
    isCrossingExpression,
    ["!", inaccessibleExpression],
    ["any", ["==", ["get", "crossing"], "unmarked"], ["!", ["has", "crossing"]]]
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
          "line-opacity": 0
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
          "line-dasharray": {
            stops: [
              [12, [DASH_INACCESSIBLE[0] * 2, DASH_INACCESSIBLE[1] * 4]],
              [14, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 2]],
              [16, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 1.5]]
            ]
          },
          "line-width": {
            stops: [
              [12, WIDTH_INACCESSIBLE / 4],
              [16, WIDTH_INACCESSIBLE],
              [20, WIDTH_INACCESSIBLE * 4]
            ]
          },
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            CROSSINGS_VISIBLE - 0.5,
            0.0,
            CROSSINGS_VISIBLE,
            1
          ]
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
            1
          ]
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
            1
          ]
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
            stops: [[12, 0.4], [16, 1.5], [22, 15]]
          },
          "line-width": { stops: [[12, 0.1], [16, 0.5], [22, 4]] },
          "line-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            CROSSINGS_VISIBLE - 0.5,
            0.0,
            CROSSINGS_VISIBLE,
            1
          ]
        }}
        beforeId="bridge-street"
      />
    </>
  );
};

Crossings.propTypes = {
  avoidCurbs: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { profile } = state;

  const currentProfile =
    profile.selected === "Custom"
      ? profile.custom
      : defaultProfiles[profile.selected];

  return {
    avoidCurbs: currentProfile.avoidCurbs
  };
};

export default connect(mapStateToProps)(Crossings);
