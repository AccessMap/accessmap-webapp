import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import RegionButton from "features/region/RegionButton";

import AccessMapLogo from "!babel-loader!@svgr/webpack?icon=true!icons/accessmap-logo.svg";
import AccessMapLogoSmall from "!babel-loader!@svgr/webpack?icon=true!icons/accessmap-logo-small.svg";

import menu from "icons/menu.svg";

import { useAppDispatch } from "hooks";

import { show as showDrawer } from "features/drawer/drawer-slice";

interface Props {
  miniLogo?: boolean;
}

const TopBar = ({ miniLogo = false }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Toolbar
      className="topbar"
      nav={
        <Button
          id="main-menu"
          aria-label="Main Menu"
          icon
          svg
          onClick={() => dispatch(showDrawer())}
        >
          <SVGIcon use={menu.url} />
        </Button>
      }
      actions={[<RegionButton />]}
    >
      <div className="accessmap-title" key="accessmap-brand" aria-hidden>
        {miniLogo ? (
          <AccessMapLogoSmall className="accessmap-logo-small" role="img" />
        ) : (
          <AccessMapLogo className="accessmap-logo" role="img" />
        )}
      </div>
    </Toolbar>
  );
};

export default TopBar;
