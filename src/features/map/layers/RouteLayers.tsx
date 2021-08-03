import React from "react";
import { Layer, Source } from "react-map-gl";
import { Feature, FeatureCollection } from "geojson";

import { useAppSelector } from "hooks";

const RouteLayers = () => {
  const { routeResult } = useAppSelector((state) => state.directions);

  const route = routeResult.routes[0];

  const routePath: Feature = {
    type: "Feature",
    geometry: route.geometry,
    properties: {},
  };

  const routeJogs: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            routeResult.origin.geometry.coordinates,
            route.geometry.coordinates[0],
          ],
        },
        properties: {
          waypoint: "origin",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            route.geometry.coordinates.slice(-1)[0],
            routeResult.destination.geometry.coordinates,
          ],
        },
        properties: {
          waypoint: "destination",
        },
      },
    ],
  };

  return (
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
              stops: [
                [12, 0.2],
                [16, 3],
                [22, 30],
              ],
            },

            "line-dasharray": [0, 2],
          }}
          beforeId="crossing-click"
        />
      </Source>
      <Source id="route-path" type="geojson" data={routePath}>
        <Layer
          id="route-path"
          type="line"
          layout={{
            "line-cap": "round",
            "line-join": "round",
          }}
          paint={{
            "line-color": "#4bf",
            "line-width": {
              stops: [
                [12, 5],
                [16, 12],
                [22, 92],
              ],
            },
          }}
          beforeId="crossing-click"
        />
        <Layer
          id="route-path-outline"
          type="line"
          layout={{
            "line-cap": "round",
            "line-join": "round",
          }}
          paint={{
            "line-color": "black",
            "line-gap-width": {
              stops: [
                [12, 4.7],
                [16, 9.7],
                [22, 92],
              ],
            },
            "line-width": {
              stops: [
                [12, 0.5],
                [16, 1],
                [22, 1],
              ],
            },
          }}
          beforeId="crossing-click"
        />
      </Source>
    </>
  );
};

export default RouteLayers;
