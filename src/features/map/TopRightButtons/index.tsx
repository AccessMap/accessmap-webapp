import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";

import MapLegend from "../MapLegend";

import information from "icons/information.svg";

import { useAppSelector, useAppDispatch } from "hooks";
import { enable as enableTour } from "features/tour/tour-slice";

const TopRightButtons = (props) => {
  const dispatch = useAppDispatch();
  const { mediaType } = useAppSelector((state) => state.browser);
  const { currentActivity } = useAppSelector((state) => state.activities);

  // Don't show the 'tour' button outside of 'standard' main and directions views
  if (
    mediaType === "mobile" &&
    ["setting-profile", "directions", "directions-info"].includes(
      currentActivity
    )
  )
    return null;

  return (
    <div className="top-right-buttons">
      {!(currentActivity == "viewing-map-info") ? (
        <Button
          className="tour-btn"
          aria-label="Take a tour"
          floating
          svg
          mini
          primary
          swapTheming
          tooltipLabel="Take a tour"
          tooltipPosition="left"
          onClick={() => dispatch(enableTour())}
        >
          <SVGIcon use={information.url} />
        </Button>
      ) : null}
      {/* TODO: add real onClick/Close actions for tracking in state*/}
      <MapLegend onClick={() => null} onClose={() => null} />
    </div>
  );
};

export default TopRightButtons;
