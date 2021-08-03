import React from "react";

import MapMarker from "./MapMarker";

import { useAppSelector } from "hooks";

const LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

interface WaypointProps {
  lon: number;
  lat: number;
  label?: string;
}

const Waypoint = ({ lon, lat, label = null }: WaypointProps) => {
  return <MapMarker lon={lon} lat={lat} label={label} />;
};

const WaypointsLayers = (props) => {
  const { poi, waypoints } = useAppSelector((state) => state.waypoints);

  // TODO: implement 'time travel' so that app can get back to a selected POI
  // after routing
  const layers = [];

  if (poi) {
    layers.push(
      <Waypoint
        lon={poi.lon}
        lat={poi.lat}
        key={`POI: ${poi.lon}, ${poi.lat}`}
      />
    );
  }

  if (waypoints.length > 0) {
    waypoints.forEach((waypoint, i) => {
      if (waypoint !== null) {
        const label = LABELS[i];
        layers.push(
          <Waypoint
            lon={waypoint.lon}
            lat={waypoint.lat}
            label={label}
            key={`${label}: ${waypoint.lon}, ${waypoint.lat}`}
          />
        );
      }
    });
  }

  return <>{layers}</>;
};

export { WaypointsLayers };
