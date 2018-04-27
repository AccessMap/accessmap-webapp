import React from 'react';

import Card, { CardTitle } from 'react-md/src/js/Cards';

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
    const ptype = p.path_type;
    const distance = Math.round(p.length, 1);

    let title;
    switch (ptype) {
      case 'sidewalk':
        title = `Use sidewalk: ${p.side} of ${p.street_name}`;
        break;
      case 'crossing':
        title = `Cross ${p.street_name}`;
        break;
      case 'elevator_path':
        title = 'Use elevator';
        break;
      default:
        title = 'Move along';
    }

    let subtitle;
    switch (ptype) {
      case 'sidewalk':
        subtitle = `${distance} meters`;
        break;
      case 'crossing':
        subtitle = `${distance} meters`;
        break;
      case 'elevator_path':
        subtitle = `${distance} meters: ${p.via}`;
        break;
      default:
        subtitle = 'Move along';
    }

    const origin = routeResult.origin.geometry.coordinates;
    const destination = routeResult.destination.geometry.coordinates;
    const key = `step-${origin}-${destination}-${i}`;

    return (
      <Card className='directions--step' key={key}>
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
      </Card>
    );
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
