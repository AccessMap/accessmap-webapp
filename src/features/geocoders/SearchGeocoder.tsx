import React from "react";

import GeocoderAutocomplete from "./GeocoderAutocomplete";

interface Props {
  // TODO: automatically include props like 'className'?
  id: string;
  className?: string;
  listClassName?: string;
  placeholder?: string;
  bbox: [number, number, number, number];
  lon: number;
  lat: number;
  poiName: string;
  onAutoComplete(label: string, index: number, data: object): void;
}

const SearchGeocoder = ({
  id,
  className,
  listClassName,
  placeholder,
  bbox,
  lon,
  lat,
  onAutoComplete,
  poiName = "",
}: Props) => {
  return (
    <GeocoderAutocomplete
      id={id}
      aria-label="Search for an address"
      key={"search-geocoder"}
      className={className || "search-geocoder md-title--toolbar"}
      listClassName={listClassName || "toolbar-search__list"}
      bbox={bbox}
      block
      placeholder={placeholder || "Search address"}
      onAutocomplete={onAutoComplete}
      proximity={{ longitude: lon, latitude: lat }}
      defaultValue={poiName}
      value={poiName && poiName}
    />
  );
};

export default SearchGeocoder;
