import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions, CardText } from "react-md/src/js/Cards";
import { Tabs, Tab } from "react-md/src/js/Tabs";
import Toolbar from "react-md/src/js/Toolbars";
import SVGIcon from "react-md/src/js/SVGIcons";

import AvoidCurbsToggle from "containers/Settings/AvoidCurbsToggle";
import TactilePavingToggle from "containers/Settings/TactilePavingToggle";
import DownhillSlider from "containers/Settings/DownhillSlider";
import UphillSlider from "containers/Settings/UphillSlider";
import LandmarkSlider from "containers/Settings/LandmarkSlider";

import ProfileSaveButton from "components/ProfileSaveButton";

import close from "icons/close.svg";

const SettingsCard = props => {
  const {
    actions,
    editorMode,
    isLoggedIn,
    mediaType,
    selectedProfile,
    settingProfile
  } = props;

  if (mediaType !== "mobile" || !settingProfile) return null;

  let settingsComponent;
  switch (editorMode) {
    case "UPHILL":
      settingsComponent = <UphillSlider />;
      break;
    case "DOWNHILL":
      settingsComponent = <DownhillSlider />;
      break;
    case "LANDMARK":
      settingsComponent = <LandmarkSlider />;
      break;
    case "BARRIERS":
      settingsComponent = <AvoidCurbsToggle />;
      break;
    case "TACTILEPAVING":
      settingsComponent = <TactilePavingToggle />;
    default:
      settingsComponent = <UphillSlider />;
  }

  let saveButton = null;
  if (selectedProfile === "Custom") {
    saveButton = (
      <ProfileSaveButton
        mini
        onClick={() => {
          if (isLoggedIn) {
            actions.saveProfileRequest();
          } else {
            actions.openSignupPrompt();
          }
        }}
      />
    );
  }

  return (
    <Card className="settings-card">
      <Toolbar
        actions={[
          <Button
            key="close-profile-settings-button"
            aria-label="close profile settings"
            icon
            svg
            tooltipLabel="Close"
            tooltipPosition="left"
            onClick={() => actions.toggleSettingProfile(settingProfile)}
          >
            <SVGIcon use={close.url} />
          </Button>
        ]}
      >
        <Tabs
          tabId="custom-settings"
          inactiveTabClassName="md-text--secondary"
          onTabChange={activeTabIndex => {
            switch (activeTabIndex) {
              case 0:
                actions.openUphillPreferences();
                break;
              case 1:
                actions.openDownhillPreferences();
                break;
              case 2:
                actions.openBarriersPreferences();
                break;
              default:
                actions.openUphillPreferences();
            }
          }}
        >
          <Tab id="tab-uphill" label="Uphill" />
          <Tab id="tab-downhill" label="Downhill" />
          <Tab id="tab-barriers" label="Barriers" />
        </Tabs>
      </Toolbar>
      <CardText>{settingsComponent}</CardText>
      <CardActions>{saveButton}</CardActions>
    </Card>
  );
};

SettingsCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  mediaType: PropTypes.oneOf(["mobile", "tablet", "desktop"]),
  editorMode: PropTypes.oneOf(["UPHILL", "DOWNHILL", "BARRIERS", null]),
  selectedProfile: PropTypes.string.isRequired,
  settingProfile: PropTypes.bool
};

SettingsCard.defaultProps = {
  mediaType: "desktop",
  editorMode: "UPHILL",
  settingProfile: false
};

const mapStateToProps = state => {
  const { activities, auth, browser, profile } = state;

  return {
    isLoggedIn: auth.isLoggedIn,
    mediaType: browser.mediaType,
    editorMode: profile.editorMode,
    selectedProfile: profile.selected,
    settingProfile: activities.settingProfile
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsCard);
