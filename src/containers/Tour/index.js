import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Joyride from "react-joyride";

import { mainTour, mobileDirectionsTour } from "constants/tours";

import * as AppActions from "actions";

const Tour = props => {
  const { actions, enabled, mediaType, planningTrip } = props;

  if (mediaType === null) return null;
  if (!enabled) return null;
  const tour =
    mediaType === "mobile" && planningTrip ? mobileDirectionsTour : mainTour;

  return (
    <Joyride
      continuous
      steps={tour}
      run={enabled}
      callback={tourState => {
        const { action, status } = tourState;

        if (action === "close") {
          actions.disableTour();
        } else if (status === "finished") {
          actions.completedTour();
        }
      }}
    />
  );
};

Tour.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  enabled: PropTypes.bool,
  mediaType: PropTypes.string,
  viewingDirections: PropTypes.bool.isRequired
};

Tour.defaultProps = {
  enabled: false,
  mediaType: null
};

const mapStateToProps = state => {
  const { enabled } = state.tour;
  const { mediaType } = state.browser;
  const planningTrip =
    state.router.route && state.router.route.name === "directions";
  const { viewingDirections } = state.activities;

  return { enabled, mediaType, planningTrip, viewingDirections };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tour);
