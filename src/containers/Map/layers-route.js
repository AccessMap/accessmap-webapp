import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { GeoJSONLayer } from "react-mapbox-gl";

import { routeResult as routeResultProp } from "prop-schema";

const Route = props => {
  const { before, routeResult } = props;

  const widthExpression = [
    "interpolate",
    ["linear"],
    ["zoom"],
    10,
    0.4,
    16,
    8,
    20,
    28
  ];

  let output = null;
  if (routeResult && routeResult.code === "Ok") {
    const route = routeResult.routes[0];

    const routePath = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: route.geometry,
          properties: {}
        }
      ]
    };

    const routeJogs = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              routeResult.origin.geometry.coordinates,
              route.geometry.coordinates[0]
            ]
          },
          properties: {
            waypoint: "origin"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              route.geometry.coordinates.slice(-1)[0],
              routeResult.destination.geometry.coordinates
            ]
          },
          properties: {
            waypoint: "destination"
          }
        }
      ]
    };

    output = (
      <React.Fragment>
        <GeoJSONLayer
          data={routeJogs}
          lineLayout={{ "line-cap": "round" }}
          linePaint={{
            "line-color": "black",
            "line-opacity": 0.6,
            "line-width": widthExpression,
            "line-dasharray": {
              stops: [
                [12, [0, 1]],
                [15, [0, 1.5]],
                [20, [0, 4]]
              ]
            }
          }}
          before={before}
        />
        <GeoJSONLayer
          data={routePath}
          lineLayout={{
            "line-cap": "round",
            "line-join": "round"
          }}
          linePaint={{
            "line-color": "#FFBA08",
            "line-opacity": 0.5,
            "line-width": widthExpression
          }}
          before={before}
        />
        <GeoJSONLayer
          data={routePath}
          lineLayout={{
            "line-cap": "round",
            "line-join": "round"
          }}
          linePaint={{
            "line-color": "black",
            "line-gap-width": widthExpression,
            "line-width": {
              stops: [
                [12, 0.5],
                [16, 1],
                [22, 1]
              ]
            }
          }}
          before={before}
        />
      </React.Fragment>
    );
  }
  return output;
};

Route.propTypes = {
  before: PropTypes.string,
  routeResult: routeResultProp
};

Route.defaultProps = {
  before: "bridge-street",
  routeResult: null
};

const mapStateToProps = state => ({
  routeResult: state.route.routeResult
});

export default connect(mapStateToProps)(Route);
