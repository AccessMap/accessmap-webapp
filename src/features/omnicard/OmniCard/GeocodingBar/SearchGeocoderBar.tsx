import React from "react";

import cn from "classnames";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import SearchGeocoder from "features/geocoders/SearchGeocoder";

import directions from "icons/directions.svg";
import search from "icons/search.svg";

import { useAppSelector, useAppDispatch } from "hooks";

import { clickOmniCardTripPlanningButton } from "features/omnicard/omnicard-slice";
import { searchGeocode } from "features/geocoders/geocoders-slice";

const SearchGeocoderBar = () => {
  const dispatch = useAppDispatch();

  const region = useAppSelector((state) => state.region);
  const { lon, lat } = useAppSelector((state) => state.map);
  const { poi } = useAppSelector((state) => state.waypoints);

  return (
    <Toolbar
      className="geocoder-toolbar"
      title={
        <SearchGeocoder
          id="search-geocoder"
          bbox={region.bounds}
          lon={lon}
          lat={lat}
          poiName={poi && poi.name ? poi.name : ""}
          onAutoComplete={(label, index, data) => {
            const o = data[index];
            dispatch(
              searchGeocode({
                lon: o.location.longitude,
                lat: o.location.latitude,
                name: o.name,
              })
            );
          }}
        />
      }
      nav={
        <SVGIcon
          className={cn("md-btn--toolbar toolbar-left-icon")}
          use={search.url}
        />
      }
      actions={[
        <Button
          aria-label="Trip planning mode"
          className="directions-button md-btn--toolbar"
          key="omnicard-tripplanning--toggle"
          icon
          primary
          svg
          tooltipLabel="Plan a trip"
          tooltipPosition="left"
          onClick={() => dispatch(clickOmniCardTripPlanningButton())}
        >
          <SVGIcon use={directions.url} />
        </Button>,
      ]}
    />
  );
};

export default SearchGeocoderBar;
