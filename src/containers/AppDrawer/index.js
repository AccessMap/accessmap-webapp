import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Button from "react-md/src/js/Buttons";
import Drawer from "react-md/src/js/Drawers";
import { ListItemControl } from "react-md/src/js/Lists";
import { Switch } from "react-md/src/js/SelectionControls";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import AccessMapLogo from "components/Icons/AccessMapLogo";

import close from "icons/close.svg";

const AppDrawer = props => {
  const { actions, drawerVisible } = props;

  return (
    <Drawer
      className="appdrawer"
      type={Drawer.DrawerTypes.TEMPORARY}
      visible={drawerVisible}
      position="left"
      onVisibilityChange={() => null}
      navItems={[
        {
          primaryText: "More info",
          subheader: true
        },
        {
          primaryText: "About",
          onClick: actions.clickAboutLink
        },
        {
          primaryText: "Contact",
          onClick: actions.clickContactLink
        },
        {
          primaryText: "Tracking settings",
          subheader: true
        },
        <ListItemControl
          aria-label="Allow analytics for research use"
          key="toggle-track"
          secondaryAction={
            <Switch
              id="toggle-track"
              name="track"
              label="Research use"
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
      header={
        <Toolbar
          title={
            <div className="accessmap-title" key="accessmap-brand">
              <AccessMapLogo />
            </div>
          }
          actions={[
            <Button
              key="close-nav-menu-button"
              aria-label="Close nav menu"
              icon
              svg
              onClick={actions.hideDrawer}
            >
              <SVGIcon use={close.url} />
            </Button>
          ]}
        />
      }
    />
  );
};

AppDrawer.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  drawerVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  drawerVisible: state.activities.drawerVisible
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDrawer);
