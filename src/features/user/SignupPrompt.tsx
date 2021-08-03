import React from "react";

import Button from "react-md/src/js/Buttons";
import { DialogContainer } from "react-md/src/js/Dialogs";

import { useAppSelector, useAppDispatch } from "hooks";
import { closeSignupPrompt } from "features/user/user-slice";

const SignupPrompt = () => {
  const dispatch = useAppDispatch();
  const { signingUp } = useAppSelector((state) => state.user);

  return (
    <DialogContainer
      id="signup-prompt-container"
      visible={signingUp}
      title="Sign-in required"
      onHide={() => dispatch(closeSignupPrompt())}
    >
      <p className="md-color--secondary-text">
        Sign in (or create an account) to save profiles.
      </p>
      <Button raised primary onClick={() => dispatch(closeSignupPrompt())}>
        OK
      </Button>
    </DialogContainer>
  );
};

export default SignupPrompt;
