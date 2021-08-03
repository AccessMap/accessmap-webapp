import React from "react";

import Card from "react-md/src/js/Cards";

import DirectionsInfo from "features/directions/DirectionsInfo";

import { useAppSelector, useAppDispatch } from "hooks";
import { OMNICARD_DESKTOP_WIDTH } from "constants/omnicard";
import { clickDirectionsInfoCloseButton } from "features/directions/directions-slice";

const OmniCardDesktopSteps = () => {
  const dispatch = useAppDispatch();
  const { routeResult } = useAppSelector((state) => state.directions);

  return (
    <Card
      className="omnicard directions-info"
      style={{
        width: `${OMNICARD_DESKTOP_WIDTH}px`,
        height: "100%",
      }}
    >
      <DirectionsInfo
        onClose={() => dispatch(clickDirectionsInfoCloseButton())}
        routeResult={routeResult}
      />
    </Card>
  );
};

export default OmniCardDesktopSteps;
