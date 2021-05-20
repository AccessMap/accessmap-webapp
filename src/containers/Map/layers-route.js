import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Layer, Source } from "react-map-gl";

import { routeResult as routeResultProp } from "prop-schema";

const Route = props => {
  const { before, routeResult } = props;

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
      <>
        <Source id="route-jogs" type="geojson" data={routeJogs}>
          <Layer
            id="route-jogs"
            type="line"
            layout={{ "line-cap": "round" }}
            paint={{
              "line-color": "black",
              "line-opacity": 0.6,
              "line-width": {
                stops: [[12, 0.2], [16, 3], [22, 30]]
              },
              "line-dasharray": {
                stops: [[12, [0, 1]], [15, [0, 1.5]], [20, [0, 4]]]
              }
            }}
            beforeId={before}
          />
        </Source>
        <Source id="route-path" type="geojson" data={routePath}>
          <Layer
            id="route-path"
            type="line"
            data={routePath}
            layout={{
              "line-cap": "round",
              "line-join": "round"
            }}
            paint={{
              "line-color": "#4bf",
              "line-width": {
                stops: [[12, 5], [16, 12], [22, 92]]
              }
            }}
            beforeId={before}
          />
          <Layer
            id="route-path-outline"
            type="line"
            data={routePath}
            layout={{
              "line-cap": "round",
              "line-join": "round"
            }}
            paint={{
              "line-color": "black",
              "line-gap-width": {
                stops: [[12, 4.7], [16, 9.7], [22, 92]]
              },
              "line-width": {
                stops: [[12, 0.5], [16, 1], [22, 1]]
              }
            }}
            beforeId={before}
          />
        </Source>
      </>
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
