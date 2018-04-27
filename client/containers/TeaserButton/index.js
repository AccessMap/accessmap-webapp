import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';

import { routeResult as routeResultProps } from 'prop-schema';

const TeaserButton = (props) => {
  const {
    actions,
    routeResult,
    viewingDirections,
    viewingRoute,
  } = props;

  if (!viewingRoute || viewingDirections) return null;

  // Make a little expander card
  return (
    <Button
      className='teaserbutton'
      raised
      primary
      onClick={() => actions.viewDirections(routeResult)}
    >
      Get Directions
    </Button>
  );
};

TeaserButton.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
  viewingRoute: PropTypes.bool,
};

TeaserButton.defaultProps = {
  routeResult: null,
  viewingDirections: false,
  viewingRoute: false,
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
)(TeaserButton);
