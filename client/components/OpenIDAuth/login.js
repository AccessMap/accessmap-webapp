import React from "react";
import userManager from "../../utils/userManager";
import Avatar from 'react-md/lib/Avatars';
import {
  AccessibleFakeButton,
  IconSeparator,
} from 'react-md/lib/Helpers';

class Login extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <AccessibleFakeButton
        className={"md-btn--toolbar"}
        component={IconSeparator}
        iconBefore
        label="Sign In"
        onClick={this.onLoginButtonClick}
      >
        <Avatar suffix="grey">U</Avatar>
      </AccessibleFakeButton>
    );
  }
}

export default Login;
