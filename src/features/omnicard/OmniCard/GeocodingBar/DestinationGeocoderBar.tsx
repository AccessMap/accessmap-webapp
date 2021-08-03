import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import SearchGeocoder from "features/geocoders/SearchGeocoder";

import swapVert from "icons/swap-vert.svg";

import { useAppSelector, useAppDispatch } from "hooks";

import {
  setDestination,
  swapWaypoints,
} from "features/waypoints/waypoints-slice";
import { requestDirections } from "features/directions/directions-slice";

const DestinationGeocoderBar = () => {
  const dispatch = useAppDispatch();

  const region = useAppSelector((state) => state.region);
  const { lon, lat } = useAppSelector((state) => state.map);
  const { waypoints } = useAppSelector((state) => state.waypoints);

  return (
    <Toolbar
      className="geocoder-toolbar"
      nav={<div className="geocoder-waypoint-label">B</div>}
      title={
        <SearchGeocoder
          id="destination-geocoder"
          aria-label="Search for end address"
          key="destination-geocoder"
          className="destination-geocoder md-title--toolbar"
          listClassName="toolbar-destination__list"
          placeholder="End address"
          bbox={region.bounds}
          lon={lon}
          lat={lat}
          poiName={
            waypoints[1] && waypoints[1] !== null ? waypoints[1].name : ""
          }
          onAutoComplete={(label, index, data) => {
            const o = data[index];
            dispatch(
              setDestination({
                name: o.name,
                lon: o.location[0],
                lat: o.location[1],
              })
            );
            dispatch(requestDirections());
          }}
        />
      }
      actions={[
        <Button
          aria-label="Swap start and destination locations"
          className="md-btn--toolbar"
          key="tripplanning--swap-waypoints"
          icon
          svg
          tooltipLabel="Swap start and end"
          tooltipPosition="left"
          onClick={() => {
            dispatch(swapWaypoints());
            dispatch(requestDirections());
          }}
        >
          <SVGIcon use={swapVert.url} />
        </Button>,
      ]}
    />
  );
};

export default DestinationGeocoderBar;
