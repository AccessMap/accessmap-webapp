import React from "react";

import OmniCardMobile from "./OmniCardMobile";
import OmniCardDesktop from "./OmniCardDesktop";

import { useAppSelector } from "hooks";

const OmniCard = () => {
  const { mediaType } = useAppSelector((state) => state.browser);

  if (mediaType === "mobile") {
    return <OmniCardMobile />;
  } else {
    return <OmniCardDesktop />;
  }
};

export default OmniCard;
