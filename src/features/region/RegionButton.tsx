import React from "react";

import Button from "react-md/src/js/Buttons";

import { useAppSelector, useAppDispatch } from "hooks";

import { startSelecting as startSelectingRegion } from "./region-slice";

const RegionButton = () => {
  const dispatch = useAppDispatch();
  const region = useAppSelector((state) => state.region);

  return (
    <Button
      key="region-open-button"
      className="region-selection-open-button"
      flat
      primary
      onClick={() => dispatch(startSelectingRegion())}
    >
      {region.name}
    </Button>
  );
};

export default RegionButton;
