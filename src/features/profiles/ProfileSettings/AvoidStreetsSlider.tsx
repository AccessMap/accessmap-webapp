import React from "react";
import cn from "classnames";

import Slider from "react-md/src/js/Sliders";

import { useAppSelector, useAppDispatch } from "hooks";
import { customStreetAvoidance } from "../profiles-slice";
import { requestDirections } from "features/directions/directions-slice";

const AvoidStreetsSlider = (props) => {
  const dispatch = useAppDispatch();

  const { selected, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles[selected];
  const { streetAvoidance } = profile;
  const disabled = selected !== "Custom";

  return (
    <Slider
      className={cn("avoid-streets-slider", { editable: !disabled })}
      disabled={disabled}
      discrete
      id="avoid-streets-slider"
      label={
        "Street avoidance factor (1 = default, 0 = use streets, 2 = avoid more streets, etc."
      }
      defaultValue={streetAvoidance}
      value={streetAvoidance}
      min={0}
      max={3}
      step={0.1}
      valuePrecision={1}
      onChange={(d) => {
        dispatch(customStreetAvoidance(d));
        dispatch(requestDirections());
      }}
    />
  );
};

export default AvoidStreetsSlider;
