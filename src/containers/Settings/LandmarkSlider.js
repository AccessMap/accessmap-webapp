import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";
import { getCurrentProfile } from "selectors";

import Slider from "react-md/src/js/Sliders";

const LandmarkSlider = props => {
  const { actions, disabled, landmarkPriority } = props;

  return (
    <Slider
      className={cn("landmark-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="landmark-slider"
      label={`Landmark preference: ${landmarkPriority * 100}%`}
      defaultValue={0.2}
      min={0}
      max={1}
      step={0.05}
      valuePrecision={1}
      onChange={d => actions.setLandmarkPriority(d)}
      value={landmarkPriority}
    />
  );
};

LandmarkSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  disabled: PropTypes.bool,
  landmarkPriority: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  disabled: state.profile.selected !== "Custom",
  landmarkPriority: getCurrentProfile(state).landmarkPriority
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LandmarkSlider);
