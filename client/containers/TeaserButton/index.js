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
    mediaType,
    routeResult,
    viewingDirections,
    viewingRoute,
  } = props;

  if ((mediaType !== 'mobile') || !viewingRoute || viewingDirections) return null;

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
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
  viewingRoute: PropTypes.bool,
};

TeaserButton.defaultProps = {
  mediaType: 'mobile',
  routeResult: null,
  viewingDirections: false,
  viewingRoute: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
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
