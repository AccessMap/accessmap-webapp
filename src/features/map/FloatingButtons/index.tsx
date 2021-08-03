import React from "react";

import FloatingButton from "./FloatingButton";

import crosshairsGPS from "icons/crosshairs-gps.svg";
import minus from "icons/minus.svg";
import plus from "icons/plus.svg";

import { useAppSelector, useAppDispatch } from "hooks";
import { zoom as setZoom } from "features/map/map-slice";
import {
  clear as clearGeolocation,
  requestGeolocation,
} from "features/geolocation/geolocation-slice";

const FloatingButtons = () => {
  const dispatch = useAppDispatch();
  const { zoom } = useAppSelector((state) => state.map);
  const { status: geolocationStatus } = useAppSelector(
    (state) => state.geolocation
  );

  return (
    <div className="floating-buttons">
      <FloatingButton
        ariaLabel="Zoom to your location"
        tooltipLabel="Zoom to your location"
        icon={crosshairsGPS.url}
        onClick={() => {
          if (geolocationStatus === "Ok") {
            dispatch(clearGeolocation());
          } else {
            dispatch(requestGeolocation());
          }
        }}
      />
      <FloatingButton
        ariaLabel="Zoom in"
        tooltipLabel="Zoom in"
        icon={plus.url}
        onClick={() => dispatch(setZoom(zoom + 1))}
      />
      <FloatingButton
        ariaLabel="Zoom out"
        tooltipLabel="Zoom out"
        icon={minus.url}
        onClick={() => dispatch(setZoom(zoom - 1))}
      />
    </div>
  );
};

export default FloatingButtons;
