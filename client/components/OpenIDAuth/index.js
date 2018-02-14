import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import User from "./User";

function UserMenu(props) {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
