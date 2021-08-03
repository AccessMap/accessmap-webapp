import React from "react";

import Card, { CardText } from "react-md/src/js/Cards";

import ProfileEditorDesktop from "features/profiles/ProfileEditorDesktop";

import TimePicker from "features/trip-options/TimePicker";

import DirectionsRequestIndicator from "features/directions/DirectionsRequestIndicator";

import TopBar from "./TopBar";
import GeocodingBar from "./GeocodingBar";
import ProfilesToolbar from "./ProfilesToolbar";
import ProfileBarActions from "./ProfilesToolbar/ProfileBarActions";
import OmniCardDesktopDirectionsInfo from "./OmniCardDesktopDirectionsInfo";
import OmniCardDesktopSteps from "./OmniCardDesktopSteps";

import { useAppSelector } from "hooks";

import { OMNICARD_DESKTOP_WIDTH } from "constants/omnicard";

const OmniCardDesktop = () => {
  const { currentActivity } = useAppSelector((state) => state.activities);

  switch (currentActivity) {
    case "directions-info":
      return <OmniCardDesktopDirectionsInfo />;
    case "directions-steps":
      return <OmniCardDesktopSteps />;
    default:
    // Continue
  }

  const topBar = <TopBar />;
  const geocodingBar = <GeocodingBar />;
  const profileActions = (
    <ProfileBarActions editButton={false} tripOptionsToggle={false} />
  );

  return (
    <Card
      aria-label="main interface"
      className="omnicard"
      style={{
        width: `${OMNICARD_DESKTOP_WIDTH}px`,
        height: "100%",
      }}
    >
      <DirectionsRequestIndicator />
      {topBar}
      {geocodingBar}

      <ProfilesToolbar actions={profileActions} />
      <ProfileEditorDesktop />
      {currentActivity === "planning-trip" ? (
        <CardText>
          <h5>Trip options:</h5>
        </CardText>
      ) : null}
      {currentActivity === "planning-trip" ? (
        <TimePicker showTripOptions={true} />
      ) : null}
    </Card>
  );
};

export default OmniCardDesktop;
