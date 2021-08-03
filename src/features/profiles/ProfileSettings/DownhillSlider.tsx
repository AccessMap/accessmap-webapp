import React from "react";
import cn from "classnames";

import Slider from "react-md/src/js/Sliders";

import { useAppSelector, useAppDispatch } from "hooks";
import { customDownhillMax } from "../profiles-slice";
import { mouseOverDownhill, mouseOutDownhill } from "features/map/map-slice";
import { requestDirections } from "features/directions/directions-slice";

const DownhillSlider = (props) => {
  const dispatch = useAppDispatch();

  const { mediaType } = useAppSelector((state) => state.browser);
  const { selected, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles[selected];
  const { downhillMax } = profile;
  const disabled = selected !== "Custom";

  const downhillPercent = +(-downhillMax * 100).toPrecision(3);

  return (
    <Slider
      className={cn("downhill-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="downhill-slider"
      label={`Maximum downhill steepness: ${downhillPercent}%`}
      defaultValue={downhillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={(d) => {
        dispatch(customDownhillMax(-d / 100));
        dispatch(requestDirections());
      }}
      onMouseEnter={() =>
        mediaType !== "mobile" && dispatch(mouseOverDownhill())
      }
      onMouseLeave={() =>
        mediaType !== "mobile" && dispatch(mouseOutDownhill())
      }
      value={downhillPercent}
    />
  );
};

export default DownhillSlider;
