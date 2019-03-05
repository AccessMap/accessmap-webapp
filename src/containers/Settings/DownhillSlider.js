import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Slider from "react-md/src/js/Sliders";

import { defaultProfiles } from "profiles";

const DownhillSlider = props => {
  const { actions, disabled, inclineMin } = props;

  const downhillPercent = +(-inclineMin * 100).toFixed(1);

  return (
    <Slider
      disabled={disabled}
      discrete
      id="downhill-slider"
      label={`Maximum downhill steepness: ${downhillPercent}%`}
      defaultValue={downhillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMin(-d / 100)}
      onMouseEnter={actions.mouseOverDownhill}
      onMouseLeave={actions.mouseOutDownhill}
      value={downhillPercent}
    />
  );
};

DownhillSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  disabled: PropTypes.bool,
  inclineMin: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  const { profile } = state;
  const { selected } = profile;

  const selectedProfile =
    selected === "Custom" ? profile.custom : defaultProfiles[selected];

  return {
    disabled: selected !== "Custom",
    inclineMin: selectedProfile.inclineMin
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownhillSlider);
