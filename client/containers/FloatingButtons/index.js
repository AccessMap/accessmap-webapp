import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import SVGIcon from 'react-md/src/js/SVGIcons';

import crosshairsGPS from 'icons/crosshairs-gps.svg';
import minus from 'icons/minus.svg';
import plus from 'icons/plus.svg';

const FloatingButtons = (props) => {
  const {
    actions,
    mediaType,
    planningTrip,
    settingProfile,
    viewingMapInfo,
    zoom,
  } = props;

  return (
    <div className='floating-buttons'>
      {(mediaType !== 'mobile') || !(planningTrip || settingProfile || viewingMapInfo) ? (
        <Button
          aria-label='Zoom to your location'
          floating
          svg
          mini
          secondary
          swapTheming
          tooltipLabel='Zoom to your location'
          tooltipPosition='left'
          onClick={actions.toggleGeolocation}
        >
          <SVGIcon use={crosshairsGPS.url} />
        </Button>) : (
        null
        )
      }
      <Button
        aria-label='Zoom in'
        floating
        svg
        mini
        secondary
        swapTheming
        tooltipLabel='Zoom in'
        tooltipPosition='left'
        onClick={() => actions.setZoom(zoom + 1)}
      >
        <SVGIcon use={plus.url} />
      </Button>
      <Button
        aria-label='Zoom out'
        floating
        svg
        mini
        secondary
        swapTheming
        tooltipLabel='Zoom out'
        tooltipPosition='left'
        onClick={() => actions.setZoom(zoom - 1)}
      >
        <SVGIcon use={minus.url} />
      </Button>
    </div>
  );
};

FloatingButtons.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  planningTrip: PropTypes.bool,
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
  zoom: PropTypes.number.isRequired,
};

FloatingButtons.defaultProps = {
  planningTrip: false,
  mediaType: 'desktop',
  settingProfile: false,
  viewingMapInfo: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  planningTrip: state.router.route && state.router.route.name === 'directions',
  settingProfile: state.activities.settingProfile,
  viewingMapInfo: state.activities.viewingMapInfo,
  zoom: state.router.route.params.z,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingButtons);
