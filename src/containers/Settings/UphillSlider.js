import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";
import { getCurrentProfile } from "selectors";

import Slider from "react-md/src/js/Sliders";

const UphillSlider = props => {
  const { actions, disabled, uphillMax } = props;

  const uphillPercent = +(uphillMax * 100).toFixed(1);

  return (
    <Slider
      className={cn("uphill-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="uphill-slider"
      label={`Maximum uphill steepness: ${uphillPercent}%`}
      defaultValue={uphillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setUphillMax(d / 100)}
      value={uphillPercent}
    />
  );
};

UphillSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  disabled: PropTypes.bool,
  uphillMax: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  disabled: state.profile.selected !== "Custom",
  uphillMax: getCurrentProfile(state).uphillMax
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UphillSlider);
