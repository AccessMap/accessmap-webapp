import React from "react";
import userManager from "../../utils/userManager";
import { AccessibleFakeButton } from 'react-md/lib/Helpers';
import Avatar from 'react-md/lib/Avatars';

import cn from 'classnames';

class Login extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <AccessibleFakeButton onClick={this.onLoginButtonClick}>
        <Avatar className={cn('md-toolbar--action-right')}>U</Avatar>
      </AccessibleFakeButton>
    );
  }
}

export default Login;
