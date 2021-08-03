import React from "react";

import Snackbar from "react-md/src/js/Snackbars";

import { useAppSelector, useAppDispatch } from "hooks";
import { pop } from "features/toast/toast-slice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const { toasts } = useAppSelector((state) => state.toast);

  return (
    <Snackbar
      id="snackbar"
      toasts={toasts.map((t) => ({
        text: t,
      }))}
      autohide
      onDismiss={() => dispatch(pop())}
    />
  );
};

export default Toast;
