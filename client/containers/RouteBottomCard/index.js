import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import Card, { CardText } from 'react-md/src/js/Cards';
import Toolbar from 'react-md/src/js/Toolbars';

import { routeResult as routeResultProps } from 'prop-schema';

const RouteBottomCard = (props) => {
  const {
    actions,
    routeResult,
    viewingDirections,
    viewingRoute,
  } = props;

  if (!viewingRoute) return null;
  if (viewingDirections) return null;

  const route = routeResult.routes[0];

  const distance = Math.round(route.distance, 0);
  const duration = Math.round(route.duration / 60, 0);

  return (
    <Card className='route-bottom-card'>
      <Toolbar
        title='Route'
      >
        <CardText>
          {distance === 0 ?
            '< 1 meter' :
            `${distance} meters`
          }
        </CardText>
        <CardText>
          {duration === 0 ?
            '< 1 minute' :
            `${duration} minutes`
          }
        </CardText>
      </Toolbar>
      <Toolbar
        actions={[
          <Button
            raised
            primary
            onClick={() => actions.viewDirections(routeResult)}
          >
            Get Directions
          </Button>,
        ]}
      />
    </Card>
  );
};

RouteBottomCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
  viewingRoute: PropTypes.bool,
};

RouteBottomCard.defaultProps = {
  routeResult: null,
  viewingRoute: false,
  viewingDirections: false,
};

const mapStateToProps = state => ({
  routeResult: state.route.routeResult,
  viewingDirections: state.activities.viewingDirections,
  viewingRoute: state.activities.viewingRoute,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteBottomCard);
