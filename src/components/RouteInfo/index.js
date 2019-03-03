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
  const duration = Math.round(route.duration / 60, 0);

  let maxUphill = 0;
  let maxDownhill = 0;
  route.legs.forEach(leg => {
    leg.forEach(step => {
      const incline = step.properties.incline / 10 || 0;
      maxUphill = Math.max(incline, maxUphill);
      maxDownhill = Math.min(incline, maxDownhill);
    });
  });

  return (
    <React.Fragment>
      <Toolbar
        title="Trip Information"
        actions={[
          <Button icon onClick={onClose}>
            close
          </Button>
        ]}
      />
      <CardText className="route-info--contents">
        <RouteElevationProfile route={routeResult.routes[0]} />
        <List>
          <ListItem
            primaryText={`${distance} meters`}
            secondaryText="Total distance"
          />
          <ListItem
            primaryText={
              duration < 1 ? "Less than 1 minute" : `${duration} minutes`
            }
            secondaryText="Estimated time"
          />
          <ListItem
            primaryText={`${maxUphill} %`}
            secondaryText="Steepest uphill incline"
          />
          <ListItem
            primaryText={`${Math.abs(maxDownhill)} %`}
            secondaryText="Steepest downhill incline"
          />
        </List>
      </CardText>
    </React.Fragment>
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
