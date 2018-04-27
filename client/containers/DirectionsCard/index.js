import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import Card, { CardText, CardTitle } from 'react-md/src/js/Cards';
import Toolbar from 'react-md/src/js/Toolbars';

import { routeResult as routeResultProps } from 'prop-schema';

const DirectionsCard = (props) => {
  const {
    actions,
    mediaType,
    routeResult,
    viewingDirections,
  } = props;

  if (!viewingDirections) return null;
  if (mediaType !== 'mobile') return null;

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
    <div className='directions-card'>
      <Card>
        <Toolbar
          title='Directions'
          actions={[
            <Button
              icon
              onClick={() => actions.closeDirections(routeResult)}
            >
              close
            </Button>,
          ]}
        />
        <CardText className='directions--steps'>
          {steps}
        </CardText>
      </Card>
    </div>
  );
};

DirectionsCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.string,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
};

DirectionsCard.defaultProps = {
  mediaType: 'desktop',
  routeResult: null,
  viewingDirections: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  routeResult: state.route.routeResult,
  viewingDirections: state.activities.viewingDirections,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectionsCard);
