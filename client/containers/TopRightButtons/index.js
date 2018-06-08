import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import SVGIcon from 'react-md/src/js/SVGIcons';

import MapInfoButton from 'containers/MapInfoButton';

import helpCircle from 'icons/help-circle.svg';

const TopRightButtons = (props) => {
  const {
    actions,
    mediaType,
    settingProfile,
    viewingMapInfo,
  } = props;

  if (mediaType === 'mobile' && settingProfile) return null;

  return (
    <div className='top-right-buttons'>
      { !viewingMapInfo ? (
        <Button
          className='tour-btn'
          floating
          svg
          mini
          secondary
          swapTheming
          tooltipLabel='Map Legend'
          tooltipPosition='left'
          onClick={actions.enableTour}
        >
          <SVGIcon use={helpCircle.url} />
        </Button>
        ) :
        null
      }
      <MapInfoButton />
    </div>
  );
};

TopRightButtons.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
};

TopRightButtons.defaultProps = {
  mediaType: 'desktop',
  settingProfile: false,
  viewingMapInfo: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  settingProfile: state.activities.settingProfile,
  viewingMapInfo: state.activities.viewingMapInfo,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopRightButtons);
