import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';
import SVGIcon from 'react-md/lib/SVGIcons';

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

  if (mediaType === 'MOBILE') {
    if (planningTrip || settingProfile || viewingMapInfo) return null;
  }

  return (
    <div className='floating-buttons'>
      <Button
        floating
        secondary
        mini
        tooltipLabel='Zoom to your location'
        tooltipPosition='left'
        onClick={actions.toggleGeolocation}
      >
        gps_fixed
      </Button>
      <Button
        floating
        svg
        mini
        tooltipLabel='Zoom in'
        tooltipPosition='left'
        onClick={() => actions.setZoom(zoom + 1)}
      >
        <SVGIcon secondary use={plus.url} />
      </Button>
      <Button
        floating
        svg
        mini
        tooltipLabel='Zoom out'
        tooltipPosition='left'
        onClick={() => actions.setZoom(zoom - 1)}
      >
        <SVGIcon secondary use={minus.url} />
      </Button>
    </div>
  );
};

FloatingButtons.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.oneOf(['MOBILE', 'TABLET', 'DESKTOP']),
  planningTrip: PropTypes.bool,
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
  zoom: PropTypes.number.isRequired,
};

FloatingButtons.defaultProps = {
  planningTrip: false,
  mediaType: 'DESKTOP',
  settingProfile: false,
  viewingMapInfo: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  planningTrip: state.activities.planningTrip,
  settingProfile: state.activities.settingProfile,
  viewingMapInfo: state.activities.viewingMapInfo,
  zoom: state.view.zoom,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingButtons);
