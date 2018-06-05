import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import App from 'containers/App';

const Index = (props) => {
  if (props.silent) return null;
  return <App />;
};

Index.propTypes = {
  silent: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const silentRoutes = ['root.signin', 'root.silent'];
  const { route } = state.router;
  return {
    silent: route && silentRoutes.includes(route.name),
  };
};

export default connect(
  mapStateToProps,
)(Index);
