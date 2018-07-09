import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import App from 'containers/App';

import * as AppActions from 'actions';

const Index = (props) => {
  const { actions, routeName, uuid } = props;
  switch (routeName) {
    case 'signin':
    case 'silent':
    case 'signout':
      return null;
    case 'root.emission':
      actions.initializeEmission(uuid);
      return null;
    default:
      return <App />;
  }
};

Index.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  routeName: PropTypes.string.isRequired,
  uuid: PropTypes.string,
};

Index.defaultProps = {
  uuid: null,
};

const mapStateToProps = (state) => {
  const { route } = state.router;
  return {
    routeName: route ? route.name : null,
    uuid: (route && route.name === 'root.emission') ? route.params.uuid : null,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
