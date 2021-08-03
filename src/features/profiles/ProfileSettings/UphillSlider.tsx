import React from "react";
import cn from "classnames";

import Slider from "react-md/src/js/Sliders";

import { useAppSelector, useAppDispatch } from "hooks";
import { customUphillMax } from "../profiles-slice";
import { requestDirections } from "features/directions/directions-slice";

const UphillSlider = (props) => {
  const dispatch = useAppDispatch();
  const { selected, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles[selected];
  const { uphillMax } = profile;
  const disabled = selected !== "Custom";

  const uphillPercent = +(uphillMax * 100).toPrecision(3);

  return (
    <Slider
      className={cn("uphill-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="uphill-slider"
      label={`Maximum uphill steepness: ${uphillPercent}%`}
      defaultValue={uphillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={(d) => {
        dispatch(customUphillMax(d / 100));
        dispatch(requestDirections());
      }}
      value={uphillPercent}
    />
  );
};

export default UphillSlider;
