import React from "react";

import Card from "react-md/src/js/Cards";

import Steps from "../Steps";
import DirectionsInfo from "../DirectionsInfo";

import { useAppSelector, useAppDispatch } from "hooks";
import {
  clickStepsCloseButton,
  clickDirectionsInfoCloseButton,
} from "../directions-slice";

const DirectionsSheet = () => {
  const dispatch = useAppDispatch();
  const { currentActivity } = useAppSelector((state) => state.activities);
  const { mediaType } = useAppSelector((state) => state.browser);
  const { routeResult } = useAppSelector((state) => state.directions);

  if (mediaType !== "mobile") return null;

  return (
    <div className="directions-sheet">
      <Card>
        {currentActivity === "directions-steps" ? (
          <Steps
            onClose={() => dispatch(clickStepsCloseButton())}
            routeResult={routeResult}
          />
        ) : (
          <DirectionsInfo
            onClose={() => dispatch(clickDirectionsInfoCloseButton())}
            routeResult={routeResult}
          />
        )}
      </Card>
    </div>
  );
};

export default DirectionsSheet;
