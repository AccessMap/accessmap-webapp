import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

const MapOverlay = (props) => {
  const {
    children,
    mediaType,
    planningTrip,
    settingProfile,
    viewingDirections,
    viewingMapInfo,
    viewingRoute,
  } = props;

  const noToolbar = (
    (
      planningTrip
      ||
      settingProfile
      ||
      viewingMapInfo
    )
    &&
    (mediaType === 'mobile')
  );

  return (
    <div
      className={cn('map-overlay', {
        notoolbar: noToolbar,
        directions: (mediaType === 'mobile') && viewingDirections,
        routeview: (mediaType === 'mobile') && (viewingRoute && !viewingDirections),
      })}
    >
      {children}
    </div>
  );
};

MapOverlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  planningTrip: PropTypes.bool,
  settingProfile: PropTypes.bool,
  viewingDirections: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
  viewingRoute: PropTypes.bool,
};

MapOverlay.defaultProps = {
  children: null,
  mediaType: 'desktop',
  planningTrip: false,
  settingProfile: false,
  viewingDirections: false,
  viewingMapInfo: false,
  viewingRoute: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  planningTrip: state.activities.planningTrip,
  settingProfile: state.activities.settingProfile,
  viewingDirections: state.activities.viewingDirections,
  viewingMapInfo: state.activities.viewingMapInfo,
  viewingRoute: state.activities.viewingRoute,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapOverlay);
