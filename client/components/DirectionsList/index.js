import React from 'react';

import { CrossingCard, ElevatorPathCard, SidewalkCard } from 'components/DirectionsCards';

import { routeResult as routeResultProps } from 'prop-schema';

const DirectionsList = (props) => {
  const {
    routeResult,
  } = props;

  const stepsData = routeResult.routes[0].legs[0];
  const steps = stepsData.map((d, i) => {
    // Transform raw data into ListItems
    // TODO: create a dedicated 'directions step' component
    const p = d.properties;

    const origin = routeResult.origin.geometry.coordinates;
    const destination = routeResult.destination.geometry.coordinates;
    const key = `step-${origin}-${destination}-${i}`;

    switch (p.path_type) {
      case 'sidewalk':
        return (
          <SidewalkCard
            key={key}
            distance={p.length}
            streetName={p.street_name}
            streetSide={p.side}
          />
        );
      case 'crossing':
        return (
          <CrossingCard
            key={key}
            distance={p.length}
            streetName={p.street_name}
          />
        );
      case 'elevator_path':
        return (
          <ElevatorPathCard
            key={key}
            distance={p.length}
            indoor={p.indoor}
            via={p.via}
          />
        );
      default:
        return null;
    }
  });

  return (
    <React.Fragment>
      {steps}
    </React.Fragment>
  );
};

DirectionsList.propTypes = {
  routeResult: routeResultProps,
};

DirectionsList.defaultProps = {
  routeResult: null,
};

export default DirectionsList;
