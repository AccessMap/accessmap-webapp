import React, { useState } from "react";

import Card from "react-md/src/js/Cards";

import TimePicker from "features/trip-options/TimePicker";

import DirectionsRequestIndicator from "features/directions/DirectionsRequestIndicator";

import TopBar from "./TopBar";
import GeocodingBar from "./GeocodingBar";
import ProfilesToolbar from "./ProfilesToolbar";
import ProfileBarActions from "./ProfilesToolbar/ProfileBarActions";

import { useAppSelector } from "hooks";
import { OMNICARD_MOBILE_LANDSCAPE_WIDTH } from "constants/omnicard";

const OmniCardMobile = () => {
  const [showTripOptions, setShowTripOptions] = useState(false);

  const { currentActivity } = useAppSelector((state) => state.activities);
  const { orientation } = useAppSelector((state) => state.browser);
  switch (currentActivity) {
    case "setting-profile":
    case "directions-steps":
    case "directions-info":
      return null;
    default:
    // Continue
  }

  let style = {};
  if (orientation === "landscape") {
    style["width"] = `${OMNICARD_MOBILE_LANDSCAPE_WIDTH}px`;
  } else {
    style["width"] = "100%";
  }

  const topBar =
    currentActivity === "planning-trip" ? null : <TopBar miniLogo />;
  const geocodingBar = <GeocodingBar />;
  const profileActions = (
    <ProfileBarActions
      editButton={true}
      tripOptionsToggle={currentActivity === "planning-trip"}
      showingTripOptions={showTripOptions}
      onClickShowTripOptions={() => setShowTripOptions(true)}
      onClickHideTripOptions={() => setShowTripOptions(false)}
    />
  );

  return (
    <Card aria-label="main interface" className="omnicard" style={style}>
      <DirectionsRequestIndicator />
      {topBar}
      {geocodingBar}
      <ProfilesToolbar actions={profileActions} />
      <TimePicker showTripOptions={showTripOptions} />
    </Card>
  );
};

export default OmniCardMobile;
