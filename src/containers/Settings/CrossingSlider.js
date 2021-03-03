import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";
import { getCurrentProfile } from "selectors";

import Slider from "react-md/src/js/Sliders";

const CrossingSlider = props => {
  const { actions, disabled, crossingPriority } = props;

  return (
    <Slider
      className={cn("crossing-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="crossing-slider"
      label={`Controlled crossing preference: ${crossingPriority * 100}%`}
      defaultValue={0.2}
      min={0}
      max={1}
      step={0.05}
      valuePrecision={1}
      onChange={d => actions.setCrossingPriority(d)}
      value={crossingPriority}
    />
  );
};

CrossingSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  disabled: PropTypes.bool,
  crossingPriority: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  disabled: state.profile.selected !== "Custom",
  crossingPriority: getCurrentProfile(state).crossingPriority
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CrossingSlider);
