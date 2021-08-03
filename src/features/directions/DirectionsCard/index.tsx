import React from "react";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions, CardText } from "react-md/src/js/Cards";
import Toolbar from "react-md/src/js/Toolbars";

import { useAppSelector, useAppDispatch } from "hooks";
import {
  clickStepsButton,
  clickDirectionsInfoButton,
} from "features/directions/directions-slice";

import {
  OMNICARD_DESKTOP_WIDTH,
  OMNICARD_MOBILE_LANDSCAPE_WIDTH,
} from "constants/omnicard";

const DirectionsCard = () => {
  const dispatch = useAppDispatch();
  const currentActivity = useAppSelector(
    (state) => state.activities.currentActivity
  );
  const { hasRoute, routeResult } = useAppSelector((state) => state.directions);
  const { mediaType, orientation } = useAppSelector((state) => state.browser);

  if (!hasRoute) return null;
  if (currentActivity === "directions-info") return null;
  if (currentActivity === "directions-steps") return null;

  const route = routeResult.routes[0];

  const distance = Math.round(route.distance);
  const duration = Math.round(route.duration / 60);

  let style;
  if (mediaType === "mobile") {
    if (orientation === "portrait") {
      style = {
        left: 0,
      };
    } else {
      style = {
        left: 0,
        width: `${OMNICARD_MOBILE_LANDSCAPE_WIDTH}px`,
      };
    }
  } else {
    style = {
      left: `${OMNICARD_DESKTOP_WIDTH + 8}px`,
    };
  }

  return (
    <Card className="directions-card" style={style}>
      <Toolbar title="Route">
        <CardText>
          {distance === 0 ? "< 1 meter" : `${distance} meters`}
        </CardText>
        <CardText>
          {duration === 0 ? "< 1 minute" : `${duration} minutes`}
        </CardText>
      </Toolbar>
      <CardActions>
        <Button
          className="directions-card--button"
          raised
          primary
          onClick={() => dispatch(clickDirectionsInfoButton())}
        >
          Trip info
        </Button>
        <Button
          className="directions-card--button"
          raised
          primary
          onClick={() => dispatch(clickStepsButton())}
        >
          Directions
        </Button>
      </CardActions>
    </Card>
  );
};

export default DirectionsCard;
