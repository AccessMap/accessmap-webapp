import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { push } from "react-router-redux";
import userManager from "../../utils/UserManager";

class CallbackPage extends React.Component {
  render() {
    // just redirect to '/' in both cases
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={() => this.props.dispatch(push("/"))}
        errorCallback={() => this.props.dispatch(push("/"))}
      >
        <div>
          <br/>
          &nbsp;&nbsp; Redirecting...<br/><br/>
          &nbsp;&nbsp; If this page take too long to respond, please try logging in again or
          contact AccessMap group.
        </div>
      </CallbackComponent>
    );
  }
}

export default connect()(CallbackPage);
