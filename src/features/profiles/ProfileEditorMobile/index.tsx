import React from "react";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions, CardText } from "react-md/src/js/Cards";
import { Tabs, Tab } from "react-md/src/js/Tabs";
import Toolbar from "react-md/src/js/Toolbars";
import SVGIcon from "react-md/src/js/SVGIcons";

import AvoidCurbsToggle from "../ProfileSettings/AvoidCurbsToggle";
import AvoidStreetsSlider from "../ProfileSettings/AvoidStreetsSlider";
import DownhillSlider from "../ProfileSettings/DownhillSlider";
import UphillSlider from "../ProfileSettings/UphillSlider";
import ProfileSaveButton from "../ProfileSaveButton";

import close from "icons/close.svg";

import { useAppSelector, useAppDispatch } from "hooks";
import { openSignupPrompt } from "features/user/user-slice";
import {
  saveProfile,
  editProfile,
  clickProfileEditCloseButton,
} from "../profiles-slice";

const ProfileEditorMobile = () => {
  const dispatch = useAppDispatch();
  const { mediaType } = useAppSelector((state) => state.browser);
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const { selected, editingProfile } = useAppSelector(
    (state) => state.profiles
  );
  const { currentActivity } = useAppSelector((state) => state.activities);

  if (mediaType !== "mobile") return null;
  if (currentActivity !== "setting-profile") return null;

  let settingsComponent;
  switch (editingProfile) {
    case "UPHILL":
      settingsComponent = <UphillSlider />;
      break;
    case "DOWNHILL":
      settingsComponent = <DownhillSlider />;
      break;
    case "BARRIERS":
      settingsComponent = <AvoidCurbsToggle />;
      break;
    case "STREET_AVOIDANCE":
      settingsComponent = <AvoidStreetsSlider />;
      break;
    default:
      settingsComponent = <UphillSlider />;
  }

  let saveButton = null;
  if (selected === "Custom") {
    saveButton = (
      <ProfileSaveButton
        mini
        onClick={() => {
          if (isLoggedIn) {
            dispatch(saveProfile());
          } else {
            dispatch(openSignupPrompt());
          }
        }}
      />
    );
  }

  return (
    <Card className="profile-editor-mobile">
      <Toolbar
        actions={[
          <Button
            key="close-profile-settings-button"
            aria-label="close profile settings"
            icon
            svg
            tooltipLabel="Close"
            tooltipPosition="left"
            onClick={() => dispatch(clickProfileEditCloseButton())}
          >
            <SVGIcon use={close.url} />
          </Button>,
        ]}
      >
        <Tabs
          tabId="custom-settings"
          inactiveTabClassName="md-text--secondary"
          onTabChange={(activeTabIndex) => {
            switch (activeTabIndex) {
              case 0:
                dispatch(editProfile("UPHILL"));
                break;
              case 1:
                dispatch(editProfile("DOWNHILL"));
                break;
              case 2:
                dispatch(editProfile("BARRIERS"));
                break;
              case 3:
                dispatch(editProfile("STREET_AVOIDANCE"));
                break;
              default:
                dispatch(editProfile("UPHILL"));
            }
          }}
        >
          <Tab id="tab-uphill" label="Uphill" />
          <Tab id="tab-downhill" label="Downhill" />
          <Tab id="tab-barriers" label="Barriers" />
          <Tab id="tab-street-avoidance" label="Streets" />
        </Tabs>
      </Toolbar>
      <CardText>{settingsComponent}</CardText>
      <CardActions>{saveButton}</CardActions>
    </Card>
  );
};

export default ProfileEditorMobile;
