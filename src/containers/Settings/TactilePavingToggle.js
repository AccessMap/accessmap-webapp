import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import { getCurrentProfile } from "selectors";

import SelectionControl from "react-md/src/js/SelectionControls";

const TactilePavingToggle = props => {
  const { actions, tactilePaving, disabled } = props;

  return (
    <SelectionControl
      disabled={disabled}
      type="switch"
      aria-label={tactilePaving ? "Ignore tactile paving" : "Require tactile paving"}
      checked={tactilePaving}
      id="require_tactilepaving"
      label={props.label || "Avoid tactile paving"}
      name="require_tactilepaving_toggle"
      onChange={actions.toggleTactilePaving}
    />
  );
};

TactilePavingToggle.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  tactilePaving: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string
};

TactilePavingToggle.defaultProps = {
  label: null
};

const mapStateToProps = state => ({
  tactilePaving: getCurrentProfile(state).tactilePaving,
  disabled: state.profile.selected !== "Custom"
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TactilePavingToggle);
