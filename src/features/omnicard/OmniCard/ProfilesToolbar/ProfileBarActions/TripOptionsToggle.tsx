import React from "react";

import cn from "classnames";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";

import chevronDown from "icons/chevron-down.svg";

const TripOptionsToggle = ({
  showingTripOptions = false,
  onClickShowTripOptions,
  onClickHideTripOptions,
}) => {
  return (
    <Button
      aria-label="Toggle display of trip options"
      icon
      svg
      className="trip-options-collapser md-fake-btn md-icon md-btn--icon md-inline-block"
      onClick={() => {
        if (showingTripOptions) {
          onClickHideTripOptions();
        } else {
          onClickShowTripOptions();
        }
      }}
    >
      <i
        className={cn("md-icon material-icons md-collapser", {
          "md-collapser--flipped": showingTripOptions,
        })}
      >
        <SVGIcon use={chevronDown.url} />
      </i>
    </Button>
  );
};

export default TripOptionsToggle;
