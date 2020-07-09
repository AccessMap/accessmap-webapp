import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layer } from "react-mapbox-gl";

import { defaultProfiles } from "profiles";

const CROSSINGS_VISIBLE = 15;
const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [WIDTH_INACCESSIBLE * 2, WIDTH_INACCESSIBLE * 1.5];

const Crossings = props => {
  const { avoidCurbs, tactilePaving } = props;

  const widthExpression = {
    stops: [[12, 0.5], [16, 3], [22, 30]]
  };

  const isCrossingExpression = ["==", ["get", "footway"], "crossing"];

  const inaccessibleCurbExpression = [
    "all",
    isCrossingExpression,
    avoidCurbs,
    ["!", ["to-boolean", ["get", "curbramps"]]]
  ];

  const inaccessibleTactilePavingExpression = [
    "all",
    isCrossingExpression,
    tactilePaving,
    ["!", ["to-boolean", ["get", "tactile_paving"]]]
  ]

  const inaccessibleExpression = [
    "any",
    inaccessibleCurbExpression,
    inaccessibleTactilePavingExpression
  ]

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
    <React.Fragment>
      <Layer
        id="crossing-click"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
        paint={{
          "line-width": widthExpression,
          "line-opacity": 0
        }}
        before="bridge-street"
      />
      <Layer
        id="crossing-inaccessible"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
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
        before="bridge-street"
      />
      <Layer
        id="crossing-unmarked"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
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
        before="bridge-street"
      />
      <Layer
        id="crossing-marked-background"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
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
        before="bridge-street"
      />
      <Layer
        id="crossing-marked-outline"
        type="line"
        sourceId="pedestrian"
        sourceLayer="transportation"
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
        before="bridge-street"
      />
    </React.Fragment>
  );
};

Crossings.propTypes = {
  avoidCurbs: PropTypes.bool.isRequired,
  tactilePaving: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const { profile } = state;

  const currentProfile =
    profile.selected === "Custom"
      ? profile.custom
      : defaultProfiles[profile.selected];

  return {
    avoidCurbs: currentProfile.avoidCurbs,
    tactilePaving: currentProfile.tactilePaving
  };
};

export default connect(mapStateToProps)(Crossings);
