import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import App from "containers/App";

const Index = props => {
  const { routeName } = props;
  switch (routeName) {
    case "signin":
    case "silent":
    case "signout":
      return null;
    default:
      return <App />;
  }
};

Index.propTypes = {
  routeName: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { route } = state.router;
  return {
    routeName: route ? route.name : null
  };
};

export default connect(mapStateToProps)(Index);
