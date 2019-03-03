import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Slider from "react-md/src/js/Sliders";

const UphillSlider = props => {
  const { actions, inclineMax } = props;

  const uphillPercent = +(inclineMax * 100).toFixed(1);

  return (
    <Slider
      discrete
      id="uphill-slider"
      label={`Avoid uphill steepness above ${uphillPercent}%`}
      defaultValue={uphillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMax(d / 100)}
      value={uphillPercent}
    />
  );
};

UphillSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  inclineMax: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const { profile } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    inclineMax: currentProfile.inclineMax
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UphillSlider);
