import React from "react";
import PropTypes from "prop-types";

import SVGIcon from "react-md/src/js/SVGIcons";

import { Marker } from "react-map-gl";

import mapPin from "icons/map-pin.svg";

const MapMarker = props => {
  const { lon, lat, label, ...moreProps } = props;

  return (
    <Marker
      className="map-marker"
      longitude={lon}
      latitude={lat}
      offsetLeft={-24}
      offsetTop={-48}
      style={{ zIndex: 1 }}
      {...moreProps}
    >
      <div>
        <SVGIcon className="pin-icon" size={48} use={mapPin.url} />
        <div className="pin-label">{label}</div>
      </div>
    </Marker>
  );
};

MapMarker.propTypes = {
  lon: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  label: PropTypes.string
};

MapMarker.defaultProps = {
  label: null
};

export default MapMarker;
