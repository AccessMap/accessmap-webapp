import React from "react";

import { DialogContainer } from "react-md/src/js/Dialogs";
import List from "react-md/src/js/Lists";

interface LinkModalProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose(): void;
}

const LinkModal = ({ title, children, onClose }: LinkModalProps) => (
  <DialogContainer
    className="link-modal"
    id={`${title}-dialog`}
    aria-label={`${title} page dialog.`}
    title={title}
    visible
    contentComponent={List}
    actions={[
      {
        label: "Close",
        secondary: true,
        onClick: onClose,
      },
    ]}
    onHide={onClose}
  >
    {children}
  </DialogContainer>
);

export default LinkModal;
