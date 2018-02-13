import React from "react";
import userManager from "../../utils/userManager";
import Button from 'react-md/lib/Buttons';

class Login extends React.Component {
  onLoginButtonClick(event) {
    event.preventDefault();
    userManager.signinRedirect();
  }

  render() {
    return (
      <Button
        key='nav-signIn'
        flat
        label='Sign In'
        onClick={this.onLoginButtonClick}
      />
    );
  }
}

export default Login;
