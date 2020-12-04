import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";
import { getCurrentProfile } from "selectors";

import Slider from "react-md/src/js/Sliders";

const StepsSlider = props => {
  const { actions, disabled, stepsPriority } = props;

  return (
    <Slider
      className={cn("steps-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="steps-slider"
      label={`Stair avoidance preference: ${stepsPriority * 100}%`}
      // defaultValue={0.2}
      min={0}
      max={1}
      step={0.05}
      valuePrecision={1}
      onChange={d => actions.setStepsPriority(d)}
      value={stepsPriority}
    />
  );
};

StepsSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  disabled: PropTypes.bool,
  stepsPriority: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  disabled: state.profile.selected !== "Custom",
  stepsPriority: getCurrentProfile(state).stepsPriority
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StepsSlider);
