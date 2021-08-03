import React from "react";

import Joyride from "react-joyride";

import { mainTour, mobileDirectionsTour } from "constants/tours";

import { useAppSelector, useAppDispatch } from "hooks";
import { disable, complete } from "features/tour/tour-slice";

const Tour = () => {
  const dispatch = useAppDispatch();
  const { enabled } = useAppSelector((state) => state.tour);
  const { mediaType } = useAppSelector((state) => state.browser);
  const { currentActivity } = useAppSelector((state) => state.activities);

  // Using a boolean variable to the 'run' prop on Joyride instead of returning
  // a null component because Joyride does not clean up its state well.
  const run = enabled && mediaType !== null;

  let tour;
  if (mediaType === "mobile" && currentActivity === "planning-trip") {
    tour = mobileDirectionsTour;
  } else {
    tour = mainTour;
  }

  return (
    <Joyride
      continuous
      steps={tour}
      run={run}
      callback={(tourState) => {
        const { action, status } = tourState;

        if (action === "close") {
          dispatch(disable());
        } else if (status === "finished") {
          dispatch(complete());
        }
      }}
    />
  );
};

export default Tour;
