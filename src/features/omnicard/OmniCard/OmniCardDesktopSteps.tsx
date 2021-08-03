import React from "react";

import Card from "react-md/src/js/Cards";

import Steps from "features/directions/Steps";

import { useAppSelector, useAppDispatch } from "hooks";
import { OMNICARD_DESKTOP_WIDTH } from "constants/omnicard";
import { clickStepsCloseButton } from "features/directions/directions-slice";

const OmniCardDesktopSteps = () => {
  const dispatch = useAppDispatch();
  const { routeResult } = useAppSelector((state) => state.directions);

  return (
    <Card
      className="omnicard directions-steps"
      style={{
        width: `${OMNICARD_DESKTOP_WIDTH}px`,
        height: "100%",
      }}
    >
      <Steps
        onClose={() => dispatch(clickStepsCloseButton())}
        routeResult={routeResult}
      />
    </Card>
  );
};

export default OmniCardDesktopSteps;
