import React from "react";

import SelectionControl from "react-md/src/js/SelectionControls";

import { useAppSelector, useAppDispatch } from "hooks";
import { customAvoidCurbs } from "../profiles-slice";
import { requestDirections } from "features/directions/directions-slice";

const AvoidCurbsToggle = () => {
  const dispatch = useAppDispatch();
  const { selected, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles[selected];
  const { avoidCurbs } = profile;

  return (
    <SelectionControl
      disabled={selected !== "Custom"}
      type="switch"
      aria-label={avoidCurbs ? "Ignore curb ramps" : "Require curb ramps"}
      checked={avoidCurbs}
      id="require_curbramps"
      label={"Avoid raised curbs"}
      name="require_curbramps_toggle"
      onChange={() => {
        dispatch(customAvoidCurbs(!avoidCurbs));
        dispatch(requestDirections());
      }}
    />
  );
};

export default AvoidCurbsToggle;
