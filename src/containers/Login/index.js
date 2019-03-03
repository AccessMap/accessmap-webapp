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
  const { actions, username } = props;

  if (!username)
    return (
      <Button className="login" flat primary onClick={actions.logIn}>
        Sign in
      </Button>
    );

  return (
    <DropdownMenu
      id="user-account-menu"
      className="login"
      menuItems={[
        {
          primaryText: "",
          children: [
            <a
              className="account-link"
              key="account-menu-link"
              style={{
                position: "absolute",
                left: 0,
                width: "100%",
                overflow: "hidden"
              }}
              href="https://accounts.open-to-all.com/auth/realms/OpenToAll/account/"
            >
              <div style={{ paddingLeft: 16 }} className="md-tile-content">
                <div className="md-tile-text--primary md-text">Account</div>
              </div>
            </a>
          ]
        },
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
  username: PropTypes.string
};

Login.defaultProps = {
  username: null
};

const mapStateToProps = state => {
  const { auth } = state;
  return { username: auth ? auth.preferredUsername : null };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
