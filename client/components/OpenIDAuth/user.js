import React from "react";
import { connect } from "react-redux";
import userManager from "../../utils/userManager";
import {
  AccessibleFakeButton,
  IconSeparator,
} from 'react-md/lib/Helpers';
import Avatar from 'react-md/lib/Avatars';
import { FontIcon } from 'react-md/lib/FontIcons'
import { DropdownMenu } from 'react-md/lib/Menus'
import PropTypes from 'prop-types';

class User extends React.Component {
  render() {
    const { user } = this.props;

    const DropdownItems = [
      {
        primaryText: "[DEBUG] Show User Info",
        onClick: () => {
          // TODO: delete debug prompt
          alert(JSON.stringify(this.props.user, null, 2));
        }
      },
      {
        primaryText: "Manage Routing Profiles",
        onClick: () => alert("Not Yet Available")
      },
      {
        primaryText: "Manage Account",
        onClick: () => window.open("https://accounts.open-to-all.com", "_blank")
      },
      { divider: true },
      {
        primaryText: "Sign Out",
        onClick: (event) => {
          event.preventDefault();
          userManager.removeUser(); // removes the user data from sessionStorage
        }
      }
    ];

    const AccountMenu = ({ simplifiedMenu }) => (
      <DropdownMenu
        className={"md-btn--toolbar"}
        id={`${!simplifiedMenu ? 'smart-' : ''}avatar-dropdown-menu`}
        menuItems={DropdownItems}
        anchor={{
          x: DropdownMenu.HorizontalAnchors.INNER_RIGHT,
          y: DropdownMenu.VerticalAnchors.BOTTOM,
        }}
        position={DropdownMenu.Positions.BELOW}
        animationPosition="below"
        sameWidth
        simplifiedMenu={simplifiedMenu}
      >
        <AccessibleFakeButton
          component={IconSeparator}
          iconBefore
          label={
            <IconSeparator
              label={user.profile.email ? user.profile.email: "[Unknown Email]"}>
              <FontIcon>arrow_drop_down</FontIcon>
            </IconSeparator>
          }
        >
          <Avatar suffix="pink">
            {user.profile.name ? user.profile.name.charAt(0) : "U"}
          </Avatar>
        </AccessibleFakeButton>
      </DropdownMenu>
    );

    AccountMenu.propTypes = {
      simplifiedMenu: PropTypes.bool,
    };

    return (
      <AccountMenu />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(User);
