import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "react-md/src/js/Buttons";
import { ListItemControl } from "react-md/src/js/Lists";
import { MenuButton } from "react-md/src/js/Menus";
import { Switch } from "react-md/src/js/SelectionControls";
import Toolbar from "react-md/src/js/Toolbars";
import SVGIcon from "react-md/src/js/SVGIcons";

import AccessMapIcon from "components/Icons/AccessMapIcon";
import AccessMapLogo from "components/Icons/AccessMapLogo";

import * as AppActions from "actions";

import dotsVertical from "icons/dots-vertical.svg";

const TopBar = props => {
  const {
    actions,
    mediaType,
    planningTrip,
    settingProfile,
    viewingMapInfo
  } = props;

  const mobile = mediaType === "mobile";

  // When to hide the topbar
  if ((planningTrip || settingProfile || viewingMapInfo) && mobile) return null;

  return (
    <Toolbar
      className="topbar md-paper--1"
      title={
        <div className="accessmap-title" key="accessmap-brand">
          {mobile ? <AccessMapIcon /> : <AccessMapLogo />}
        </div>
      }
      actions={[
        <Button
          key="about-button"
          flat
          primary
          onClick={actions.clickAboutLink}
        >
          About
        </Button>,
        <Button
          key="contact-button"
          flat
          primary
          onClick={actions.clickContactLink}
        >
          Contact
        </Button>,
        <MenuButton
          key="extra-settings"
          id="extra-settings"
          icon
          anchor={{
            x: "inner right",
            y: "bottom"
          }}
          listStyle={{
            // Not sure why, but scrollbars appear in menu without this
            overflowY: "visible"
            // The 'y: 'bottom'' anchor setting isn't working?
          }}
          menuItems={[
            <ListItemControl
              key="toggle-track"
              secondaryAction={
                <Switch
                  id="toggle-track"
                  name="track"
                  label="Contribute web experience to research"
                  labelBefore
                  defaultChecked
                  onChange={checked => {
                    if (checked) {
                      actions.enableAnalytics();
                    } else {
                      actions.disableAnalytics();
                    }
                  }}
                />
              }
            />
          ]}
        >
          <SVGIcon use={dotsVertical.url} />
        </MenuButton>
      ]}
      themed
      fixed
      zDepth={0}
    >
      <h6 className="accessmaplogo-region">Seattle</h6>
    </Toolbar>
  );
};

TopBar.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  planningTrip: PropTypes.bool,
  mediaType: PropTypes.string,
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool
};

TopBar.defaultProps = {
  mediaType: null,
  planningTrip: false,
  settingProfile: false,
  viewingMapInfo: false
};

const mapStateToProps = state => {
  const { activities, browser, router } = state;

  return {
    mediaType: browser.mediaType,
    planningTrip: router.route && router.route.name === "directions",
    settingProfile: activities.settingProfile,
    viewingMapInfo: activities.viewingMapInfo
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);