import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Joyride from 'react-joyride';

import * as AppActions from 'actions';

const Tour = (props) => {
  const {
    actions,
    enabled,
    tour,
  } = props;

  if (!enabled) return null;

  return (
    <Joyride
      continuous
      steps={tour}
      run={enabled}
      callback={(tourState) => {
        const { action, status } = tourState;

        if (action === 'close') {
          actions.disableTour();
        } else if (status === 'finished') {
          actions.completedTour();
        }
      }}
    />
  );
};

Tour.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  enabled: PropTypes.bool,
  tour: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Tour.defaultProps = {
  mediaType: 'desktop',
  enabled: false,
};

const mapStateToProps = (state) => {
  const {
    tour,
  } = state;

  return {
    enabled: tour.enabled,
    tour: tour.tour,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tour);
