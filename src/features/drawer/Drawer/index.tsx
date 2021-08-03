import React from "react";

import Button from "react-md/src/js/Buttons";
import ReactMDDrawer from "react-md/src/js/Drawers";
import { ListItemControl } from "react-md/src/js/Lists";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import { useAppSelector, useAppDispatch } from "hooks";
import { hide } from "features/drawer/drawer-slice";
import { click as clickModalLink } from "features/links-modal/links-modal-slice";

import AccessMapLogo from "!babel-loader!@svgr/webpack?icon=true!icons/accessmap-logo.svg";
import { AnalyticsToggle } from "features/analytics/AnalyticsToggle";

import close from "icons/close.svg";

const Drawer = () => {
  const { visible } = useAppSelector((state) => state.drawer);
  const dispatch = useAppDispatch();

  return (
    <ReactMDDrawer
      className="appdrawer"
      type={ReactMDDrawer.DrawerTypes.TEMPORARY}
      visible={visible}
      position="left"
      onVisibilityChange={() => null}
      navItems={[
        {
          primaryText: "More info",
          subheader: true,
        },
        {
          primaryText: "About",
          onClick: () => dispatch(clickModalLink("about")),
        },
        {
          primaryText: "Contact",
          onClick: () => dispatch(clickModalLink("contact")),
        },
        {
          primaryText: "Tracking settings",
          subheader: true,
        },
        <ListItemControl
          primaryText="Allow analytics for research use"
          aria-label="Allow analytics for research use"
          key="toggle-track"
          secondaryAction={<AnalyticsToggle />}
        />,
      ]}
      header={
        <Toolbar
          title={
            <div className="accessmap-title" key="accessmap-brand">
              <AccessMapLogo className="accessmap-logo" />
            </div>
          }
          actions={[
            <Button
              key="close-nav-menu-button"
              aria-label="Close nav menu"
              icon
              svg
              onClick={() => dispatch(hide())}
            >
              <SVGIcon use={close.url} />
            </Button>,
          ]}
        />
      }
    />
  );
};

export default Drawer;
