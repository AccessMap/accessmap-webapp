import React from "react";

import { Feature, Position } from "geojson";
import { Source } from "react-map-gl";

import regions from "constants/regions";

const RegionsMaskSource = () => {
  const outer_ring = [
    [-180, -90],
    [-180, 90],
    [180, 90],
    [180, -90],
    [-180, -90],
  ];
  const inner_rings = regions.features.map((feature) => {
    const coords: Position[] = feature.geometry.coordinates[0];
    return coords;
  });

  // TODO: use a geojson inverter helper function to handle inverting
  // multipolygons in the future?
  const invertedPolygon: Feature = {
    type: "Feature",
    geometry: {
      type: "MultiPolygon",
      coordinates: [[outer_ring, ...inner_rings]],
    },
    properties: {},
  };

  return <Source id="regions-mask" type="geojson" data={invertedPolygon} />;
};

export default RegionsMaskSource;
