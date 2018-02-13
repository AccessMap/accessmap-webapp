import React from "react";
import { connect } from "react-redux";
import userManager from "../../utils/userManager";
import { AccessibleFakeButton } from 'react-md/lib/Helpers';
import Avatar from 'react-md/lib/Avatars';

import cn from 'classnames';

class User extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <AccessibleFakeButton
        onClick={() => {
          event.preventDefault();
          alert(JSON.stringify(this.props.user, null, 2));
          userManager.removeUser(); // removes the user data from sessionStorage
        }}>
        <Avatar className={cn('md-toolbar--action-right')}>{user.profile.name ? user.profile.name.charAt(0) : "Uk"}</Avatar>
      </AccessibleFakeButton>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user,
  };
}

export default connect(mapStateToProps)(User);
