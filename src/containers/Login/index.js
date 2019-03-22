import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import { AccessibleFakeButton, IconSeparator } from "react-md/src/js/Helpers";
import Avatar from "react-md/src/js/Avatars";
import Button from "react-md/src/js/Buttons";
import { DropdownMenu } from "react-md/src/js/Menus";
import SVGIcon from "react-md/src/js/SVGIcons";

import menuDown from "icons/menu-down.svg";

const Login = props => {
  const { actions, isLoggedIn, username } = props;

  if (!isLoggedIn)
    return (
      <Button
        className="login"
        raised
        primary
        onClick={actions.authenticationRequest}
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
          onClick: actions.logOut
        }
      ]}
      anchor={{
        x: DropdownMenu.HorizontalAnchors.INNER_RIGHT,
        y: DropdownMenu.VerticalAnchors.BOTTOM
      }}
      position={DropdownMenu.Positions.INNER_RIGHT}
      animationPosition="below"
      sameWidth
    >
      <AccessibleFakeButton
        component={IconSeparator}
        iconBefore
        label={<SVGIcon className="menu-down" use={menuDown.url} />}
      >
        <Avatar className="user-account-avatar">
          {`${username[0].toUpperCase()}${username[1].toLowerCase()}`}
        </Avatar>
      </AccessibleFakeButton>
    </DropdownMenu>
  );
};

Login.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string
};

Login.defaultProps = {
  username: null
};

const mapStateToProps = state => {
  const { auth } = state;
  return {
    isLoggedIn: auth.isLoggedIn,
    username: auth.displayName
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
