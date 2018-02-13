import React from "react";
import { connect } from "react-redux";
import Login from "./login";
import User from "./user";

function NavUserButton(props) {
  const { user } = props;

  return !user || user.expired ? <Login /> : <User />;
}

function mapStateToProps(state) {
  return {
    user: state.oidc.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavUserButton);
