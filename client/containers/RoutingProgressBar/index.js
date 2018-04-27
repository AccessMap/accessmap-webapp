import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import { LinearProgress } from 'react-md/src/js/Progress';

const RoutingProgressBar = (props) => {
  const {
    fetchingRoute,
  } = props;

  if (fetchingRoute) {
    return (
      <LinearProgress
        id='retrieving-route-indicator'
        className='route-progressbar'
      />
    );
  }
  return null;
};

RoutingProgressBar.propTypes = {
  fetchingRoute: PropTypes.bool,
};

RoutingProgressBar.defaultProps = {
  fetchingRoute: false,
};

const mapStateToProps = state => ({ fetchingRoute: state.route.fetchingRoute });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingProgressBar);
