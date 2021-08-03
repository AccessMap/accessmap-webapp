import React from "react";

import AboutLinkModal from "./LinkModals/AboutLinkModal";
import ContactLinkModal from "./LinkModals/ContactLinkModal";

import { useAppSelector, useAppDispatch } from "hooks";
import { close } from "./links-modal-slice";

const LinkModals = () => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.linksModal);

  switch (selected) {
    case "about":
      return <AboutLinkModal onClose={() => dispatch(close())} />;
    case "contact":
      return <ContactLinkModal onClose={() => dispatch(close())} />;
    default:
      return null;
  }
};

export default LinkModals;
