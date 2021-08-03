import React, { useEffect, useState } from "react";

import Autocomplete from "react-md/src/js/Autocompletes";
import throttle from "lodash.throttle";

import geocode from "./geocode";

type BboxType = [number, number, number, number];
interface Proximity {
  longitude: number;
  latitude: number;
}

export interface GeocoderProps {
  id: string;
  className: string;
  listClassName: string;
  block: boolean;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  bbox?: BboxType;
  // TODO: get types for react-md and update onAutocomplete
  onAutocomplete?(
    label: string | number,
    index: number,
    data: MapboxGeocoderResult[]
  ): any;
  onChange?(value: string, event: React.FormEvent<HTMLFormElement>): void;
  proximity?: Proximity;
}

interface MapboxGeocoderResult {
  name: string;
  location: number[];
}

const throttledGeocode = throttle(geocode, 250);

const GeocoderAutocomplete = ({
  bbox = null,
  onAutocomplete = null,
  onChange = null,
  proximity = null,
  id = null,
  className = null,
  listClassName = null,
  block = null,
  placeholder = null,
  defaultValue = "",
  value = undefined,
}: GeocoderProps) => {
  const [places, setPlaces] = useState<MapboxGeocoderResult[]>([]);
  const [valueState, setValue] = useState<string>(value);

  // If the value prop changes, update component's state
  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <Autocomplete
      id={id}
      className={className}
      listClassName={listClassName}
      block={block}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={valueState}
      data={places.map((d) => d.name)}
      dataLabel="name"
      deleteKeys={["location"]}
      onChange={(value, event) => {
        if (!value) {
          setPlaces([]);
          setValue(undefined);
        } else {
          setValue(value);
          throttledGeocode(
            valueState,
            bbox,
            proximity,
            (geocoded: MapboxGeocoderResult[]) => {
              if (geocoded !== undefined) {
                setPlaces(geocoded);
              }
            }
          );
        }

        if (onChange) {
          onChange(valueState, event);
        }
      }}
      onAutocomplete={(suggestion, suggestionIndex) => {
        setValue(String(suggestion));
        onAutocomplete(suggestion, suggestionIndex, places);
      }}
    />
  );
};

export default GeocoderAutocomplete;
