import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import SearchGeocoder from "features/geocoders/SearchGeocoder";

import close from "icons/close.svg";

import { useAppSelector, useAppDispatch } from "hooks";

import { clickOmniCardTripPlanningCloseButton } from "features/omnicard/omnicard-slice";
import { setOrigin } from "features/waypoints/waypoints-slice";
import { requestDirections } from "features/directions/directions-slice";

const OriginGeocoderBar = () => {
  const dispatch = useAppDispatch();

  const region = useAppSelector((state) => state.region);
  const { lon, lat } = useAppSelector((state) => state.map);
  const { waypoints } = useAppSelector((state) => state.waypoints);

  return (
    <Toolbar
      className="geocoder-toolbar"
      nav={<div className="geocoder-waypoint-label">A</div>}
      title={
        <SearchGeocoder
          id="origin-geocoder"
          aria-label="Search for start address"
          key="origin-geocoder"
          className="origin-geocoder md-title--toolbar"
          listClassName="toolbar-origin__list"
          placeholder="Start address"
          bbox={region.bounds}
          lon={lon}
          lat={lat}
          poiName={
            waypoints[0] && waypoints[0] !== null ? waypoints[0].name : ""
          }
          onAutoComplete={(label, index, data) => {
            const o = data[index];
            dispatch(
              setOrigin({
                name: o.name,
                lon: o.location.longitude,
                lat: o.location.latitude,
              })
            );
            dispatch(requestDirections());
          }}
        />
      }
      actions={[
        <Button
          aria-label="Exit trip planning"
          key="tripplanning--close"
          icon
          svg
          onClick={() => dispatch(clickOmniCardTripPlanningCloseButton())}
          tooltipLabel="Exit trip planning"
          tooltipPosition="left"
        >
          <SVGIcon use={close.url} />
        </Button>,
      ]}
    />
  );
};

export default OriginGeocoderBar;
