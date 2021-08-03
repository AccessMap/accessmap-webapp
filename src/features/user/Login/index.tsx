import React from "react";

import { AccessibleFakeButton, IconSeparator } from "react-md/src/js/Helpers";
import Avatar from "react-md/src/js/Avatars";
import Button from "react-md/src/js/Buttons";
import { DropdownMenu } from "react-md/src/js/Menus";
import SVGIcon from "react-md/src/js/SVGIcons";

import menuDown from "icons/menu-down.svg";

import { useAppSelector, useAppDispatch } from "hooks";
import { logOut, requestAuthentication } from "features/user/user-slice";

const Login = (props) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, displayName } = useAppSelector((state) => state.user);

  if (!isLoggedIn)
    return (
      <Button
        className="login"
        raised
        primary
        onClick={() => dispatch(requestAuthentication())}
      >
        Sign in
      </Button>
    );

  return (
    <DropdownMenu
      id="user-account-menu"
      className="login"
      menuItems={[
        {
          primaryText: "Sign Out",
          onClick: () => dispatch(logOut()),
        },
      ]}
      anchor={{
        x: DropdownMenu.HorizontalAnchors.INNER_RIGHT,
        y: DropdownMenu.VerticalAnchors.BOTTOM,
      }}
      position={DropdownMenu.Positions.TOP_RIGHT}
      sameWidth
    >
      <AccessibleFakeButton
        component={IconSeparator}
        iconBefore
        label={<SVGIcon className="menu-down" use={menuDown.url} />}
      >
        <Avatar className="user-account-avatar">
          {`${displayName[0].toUpperCase()}${displayName[1].toLowerCase()}`}
        </Avatar>
      </AccessibleFakeButton>
    </DropdownMenu>
  );
};

export default Login;
