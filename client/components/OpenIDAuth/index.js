import React from 'react';
import { connect } from 'react-redux';
import userManager from '../../utils/UserManager';
import { loadUserInfo } from '../../utils/api';
import PropTypes from 'prop-types';
import { DropdownMenu } from 'react-md/lib/Menus/index';
import Avatar from 'react-md/lib/Avatars';
import {
  AccessibleFakeButton,
  IconSeparator,
} from 'react-md/lib/Helpers';
import { FontIcon } from 'react-md/lib/FontIcons';

function UserMenu (props) {
  const {user} = props;

  const DropdownItems = [];
  if (user && (!user.expired)) {
    DropdownItems.push({
        primaryText: '[DEBUG] Show Token Info',
        onClick: () => {
          // TODO: delete debug prompt
          alert(
            JSON.stringify(user, null, 2),
          );
        },
      },
      {
        primaryText: '[DEBUG] Get User Info with Token',
        onClick: () => loadUserInfo(),
      },
      {
        primaryText: 'Manage Routing Profiles',
        onClick: () => alert('Not Yet Available'),
      });
  }
  DropdownItems.push({
      primaryText: 'Preferences',
      onClick: () => alert('Not Yet Available'),
    },
    {divider: true});
  if (!user || user.expired) {
    DropdownItems.push({
      primaryText: 'Sign In',
      onClick: onSignInButtonClick,
    });
  } else {
    DropdownItems.push({
      primaryText: 'Manage Account',
      onClick: () => window.open(
        'https://accounts.open-to-all.com/auth/realms/OpenToAll/account',
        '_blank'),
    }, {
      primaryText: 'Sign Out',
      onClick: onSignOutButtonClick,
    });
  }

  const AccountMenu = ({simplifiedMenu}) => (
    <DropdownMenu
      className={'md-btn--toolbar'}
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
            label={user ? user.profile.email : 'Guest'}>
            <FontIcon>arrow_drop_down</FontIcon>
          </IconSeparator>
        }
      >
        <Avatar suffix={user ? 'pink' : 'grey'}>
          {user ? user.profile.name.charAt(0) : 'G'}
        </Avatar>
      </AccessibleFakeButton>
    </DropdownMenu>
  );

  AccountMenu.propTypes = {
    simplifiedMenu: PropTypes.bool,
  };

  return (<AccountMenu/>);
}

function onSignInButtonClick (event) {
  event.preventDefault();
  userManager.signinRedirect();
}

function onSignOutButtonClick (event) {
  event.preventDefault();
  userManager.removeUser(); // removes the user data from sessionStorage
}

function mapStateToProps (state) {
  return {
    user: state.oidc.user,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
