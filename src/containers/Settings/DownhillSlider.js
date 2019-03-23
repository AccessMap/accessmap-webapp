import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";
import { getCurrentProfile } from "selectors";

import Slider from "react-md/src/js/Sliders";

const DownhillSlider = props => {
  const { actions, disabled, downhillMax } = props;

  const downhillPercent = +(-downhillMax * 100).toFixed(1);

  return (
    <Slider
      className={cn("downhill-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="downhill-slider"
      label={`Maximum downhill steepness: ${downhillPercent}%`}
      defaultValue={downhillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setDownhillMax(-d / 100)}
      onMouseEnter={actions.mouseOverDownhill}
      onMouseLeave={actions.mouseOutDownhill}
      value={downhillPercent}
    />
  );
};

DownhillSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  disabled: PropTypes.bool,
  downhillMax: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  disabled: state.profile.selected !== "Custom",
  downhillMax: getCurrentProfile(state).downhillMax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownhillSlider);
