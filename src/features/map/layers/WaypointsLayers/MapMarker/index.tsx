import React from "react";

import SVGIcon from "react-md/src/js/SVGIcons";

import { Marker } from "react-map-gl";

import mapPin from "icons/map-pin.svg";

interface Props {
  lon: number;
  lat: number;
  label?: string;
}

const MapMarker = ({ lon, lat, label = null }: Props) => {
  return (
    <Marker
      className="map-marker"
      longitude={lon}
      latitude={lat}
      offsetLeft={-24}
      offsetTop={-48}
    >
      <div>
        <SVGIcon className="pin-icon" size={48} use={mapPin.url} />
        <div className="pin-label">{label}</div>
      </div>
    </Marker>
  );
};

export default MapMarker;
