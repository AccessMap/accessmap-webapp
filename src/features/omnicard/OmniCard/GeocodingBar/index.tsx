import React from "react";

import OriginGeocoderBar from "./OriginGeocoderBar";
import DestinationGeocoderBar from "./DestinationGeocoderBar";
import SearchGeocoderBar from "./SearchGeocoderBar";

import { useAppSelector } from "hooks";

const OmniCardGeocodingBar = () => {
  const { currentActivity } = useAppSelector((state) => state.activities);
  return (
    <div className="geocoding-bar">
      {currentActivity === "planning-trip" ? (
        <>
          <OriginGeocoderBar />
          <DestinationGeocoderBar />
        </>
      ) : (
        <SearchGeocoderBar />
      )}
    </div>
  );
};

export default OmniCardGeocodingBar;
