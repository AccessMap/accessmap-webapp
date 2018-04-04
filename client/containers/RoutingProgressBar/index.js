import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import { LinearProgress } from 'react-md/lib/Progress';

const RoutingProgressBar = (props) => {
  const {
    fetchingTrip,
  } = props;

  if (fetchingTrip) {
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
  fetchingTrip: PropTypes.bool,
};

RoutingProgressBar.defaultProps = {
  fetchingTrip: false,
};

const mapStateToProps = state => ({ fetchingTrip: state.activities.fetchingTrip });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoutingProgressBar);
