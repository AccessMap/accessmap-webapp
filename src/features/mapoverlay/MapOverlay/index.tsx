import React from "react";
import cn from "classnames";

import { Activity } from "types";

interface Props {
  children: JSX.Element | JSX.Element[];
  mediaType: "mobile" | "tablet" | "desktop";
  activity: Activity;
}

const MapOverlay = ({ children, mediaType, activity }: Props) => (
  <div
    className={cn("map-overlay", {
      "planning-trip": mediaType === "mobile" && activity === "planning-trip",
      "directions-info":
        mediaType === "mobile" && activity === "directions-info",
      "directions-steps":
        mediaType === "mobile" && activity === "directions-steps",
    })}
  >
    {children}
  </div>
);

export default MapOverlay;
