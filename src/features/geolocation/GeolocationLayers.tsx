import React from "react";
import { Feature } from "geojson";

import { useAppSelector } from "hooks";
import { Layer, Source } from "react-map-gl";

const GeolocationLayers = (props) => {
  const { lon, lat, status, accuracy } = useAppSelector(
    (state) => state.geolocation
  );

  if (status !== "Ok") return null;

  const geolocationFeature: Feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lon, lat],
    },
    properties: {},
  };

  const radius = accuracy / 0.075 / Math.cos((lat * Math.PI) / 180);

  return (
    <Source id="geolocation" type="geojson" data={geolocationFeature}>
      <Layer
        type="circle"
        id="geolocation-outline"
        key="geolocation-outline"
        paint={{
          "circle-radius": {
            stops: [
              [0, 0],
              [20, radius],
            ],
            base: 2,
          },
          "circle-color": "#007cbf",
          "circle-opacity": 0.2,
        }}
      />
      <Layer
        type="circle"
        id="geolocation"
        key="geolocation"
        paint={{
          "circle-radius": 8,
          "circle-color": "#007cbf",
          "circle-opacity": 0.8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        }}
      />
    </Source>
  );
};

export default GeolocationLayers;
