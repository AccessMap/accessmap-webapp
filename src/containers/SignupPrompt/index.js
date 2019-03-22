import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DialogContainer } from "react-md/src/js/Dialogs";

import Button from "react-md/src/js/Buttons";

import * as AppActions from "actions";

const SignupPrompt = props => {
  const { actions, visible } = props;

  return (
    <DialogContainer
      id="signup-prompt-container"
      visible={visible}
      title="Sign-in required"
      onHide={actions.closeSignupPrompt}
    >
      <p className="md-color--secondary-text">
        Sign in (or create an account) to save profiles.
      </p>
      <Button raised primary onClick={actions.closeSignupPrompt}>
        OK
      </Button>
    </DialogContainer>
  );
};

SignupPrompt.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  visible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  visible: state.activities.promptingSignup
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPrompt);
