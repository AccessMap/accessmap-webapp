import React from "react";
import { Switch } from "react-md";

import { useAppSelector, useAppDispatch } from "hooks";
import { enable, disable } from "./analytics-slice";

const AnalyticsToggle = () => {
  const analyticsEnabled = useAppSelector((state) => state.analytics.enabled);
  const dispatch = useAppDispatch();

  return (
    <Switch
      id="toggle-track"
      name="track"
      label="Research use"
      labelBefore
      checked={analyticsEnabled}
      onChange={(checked) => {
        if (checked) {
          dispatch(enable());
        } else {
          dispatch(disable());
        }
      }}
    />
  );
};

export { AnalyticsToggle };
