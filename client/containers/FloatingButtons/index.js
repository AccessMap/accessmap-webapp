import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';


const FloatingButtons = (props) => {
  const {
    actions,
    mediaType,
    planningTrip,
    settingProfile,
  } = props;

  if (mediaType === 'MOBILE' && (planningTrip || settingProfile)) return null;

  return (
    <div className='floating-buttons'>
      <Button
        floating
        secondary
        tooltipLabel='Zoom to your location'
        tooltipPosition='left'
        onClick={actions.toggleGeolocation}
      >
        gps_fixed
      </Button>
      <Button
        floating
        secondary
        tooltipLabel='Plan a trip'
        tooltipPosition='left'
        onClick={() => actions.toggleTripPlanning(planningTrip)}
      >
        directions
      </Button>
    </div>
  );
};

FloatingButtons.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.oneOf(['MOBILE', 'TABLET', 'DESKTOP']),
  planningTrip: PropTypes.bool,
  settingProfile: PropTypes.bool,
};

FloatingButtons.defaultProps = {
  planningTrip: false,
  mediaType: 'DESKTOP',
  settingProfile: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  planningTrip: state.activities.planningTrip,
  settingProfile: state.activities.settingProfile,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingButtons);
