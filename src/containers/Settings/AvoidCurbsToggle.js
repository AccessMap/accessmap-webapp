import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import SelectionControl from "react-md/src/js/SelectionControls";

import { defaultProfiles } from "profiles";

const AvoidCurbsToggle = props => {
  const { actions, avoidCurbs, disabled } = props;

  return (
    <SelectionControl
      disabled={disabled}
      type="switch"
      aria-label={avoidCurbs ? "Ignore curb ramps" : "Require curb ramps"}
      checked={avoidCurbs}
      id="require_curbramps"
      label={props.label || "Avoid raised curbs"}
      name="require_curbramps_toggle"
      onChange={actions.toggleCurbRamps}
    />
  );
};

AvoidCurbsToggle.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  avoidCurbs: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

AvoidCurbsToggle.defaultProps = {
  label: null
};

const mapStateToProps = state => {
  const { profile } = state;
  const { selected } = profile;

  const selectedProfile =
    selected === "Custom" ? profile.custom : defaultProfiles[selected];

  return {
    avoidCurbs: selectedProfile.avoidCurbs,
    disabled: selected !== "Custom"
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvoidCurbsToggle);
