import React from "react";
import PropTypes from "prop-types";

import Button from "react-md/src/js/Buttons";
import { CardText } from "react-md/src/js/Cards";
import List, { ListItem } from "react-md/src/js/Lists";
import Toolbar from "react-md/src/js/Toolbars";

import RouteElevationProfile from "components/RouteElevationProfile";

import { routeResult as routeResultProps } from "prop-schema";

const RouteInfo = props => {
  const { routeResult, onClose } = props;

  const route = routeResult.routes[0];
  const distance = route.distance;
  const duration = (route.duration / 60).toFixed(0);

  let uphillMax = 0;
  let downhillMax = 0;
  route.legs.forEach(leg => {
    leg.forEach(step => {
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
          </Button>
        ]}
      />
      <CardText className="route-info--contents">
        <h4>Experienced elevation gain</h4>
        <RouteElevationProfile route={routeResult.routes[0]} />
        <List>
          <ListItem
            primaryText={`${distance.toFixed(1)} meters`}
            secondaryText="Total distance"
          />
          <ListItem
            primaryText={
              duration < 1 ? "Less than 1 minute" : `${duration} minutes`
            }
            secondaryText="Estimated time"
          />
          <ListItem
            primaryText={`${(uphillMax * 100).toFixed(1)} %`}
            secondaryText="Steepest uphill incline"
          />
          <ListItem
            primaryText={`${Math.abs(downhillMax * 100).toFixed(1)} %`}
            secondaryText="Steepest downhill incline"
          />
        </List>
      </CardText>
    </>
  );
};

RouteInfo.propTypes = {
  onClose: PropTypes.func,
  routeResult: routeResultProps
};

RouteInfo.defaultProps = {
  onClose: null,
  routeResult: null
};

export default RouteInfo;
