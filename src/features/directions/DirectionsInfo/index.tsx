import React from "react";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import List, { ListItem } from "react-md/src/js/Lists";
import Toolbar from "react-md/src/js/Toolbars";

import ElevationProfile from "../ElevationProfile";

import { RouteResult } from "types";

interface Props {
  onClose?(event: React.MouseEvent): void;
  routeResult?: RouteResult;
}

const DirectionsInfo = ({ onClose, routeResult }: Props) => {
  const route = routeResult.routes[0];
  const { distance, duration } = route;
  const durationString = Math.round(route.duration / 60);

  let uphillMax = 0;
  let downhillMax = 0;
  route.legs.forEach((leg) => {
    leg.forEach((step) => {
      const incline = step.properties.incline || 0;
      uphillMax = Math.max(incline, uphillMax);
      downhillMax = Math.min(incline, downhillMax);
    });
  });

  return (
    <>
      <Toolbar
        title="Trip Information"
        actions={[
          <Button key="close-trip-info-button" icon onClick={onClose}>
            close
          </Button>,
        ]}
      />
      <CardText className="directions-info--contents">
        <h4>Experienced elevation gain</h4>
        <ElevationProfile route={routeResult.routes[0]} />
        <List>
          <ListItem
            primaryText={`${distance.toPrecision(1)} meters`}
            secondaryText="Total distance"
          />
          <ListItem
            primaryText={
              duration < 1 ? "Less than 1 minute" : `${durationString} minutes`
            }
            secondaryText="Estimated time"
          />
          <ListItem
            primaryText={`${(uphillMax * 100).toPrecision(1)} %`}
            secondaryText="Steepest uphill incline"
          />
          <ListItem
            primaryText={`${Math.abs(downhillMax * 100).toPrecision(1)} %`}
            secondaryText="Steepest downhill incline"
          />
        </List>
      </CardText>
    </>
  );
};

export default DirectionsInfo;
