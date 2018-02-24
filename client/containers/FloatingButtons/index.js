import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';


const FloatingButtons = (props) => {
  const {
    actions,
    planningTrip,
  } = props;

  return (
    <div className='floating-buttons'>
      <Button
        floating
        secondary
        onClick={actions.toggleGeolocation}
      >
        gps_fixed
      </Button>
      <Button
        floating
        secondary
        onClick={d => { actions.toggleTripPlanning(planningTrip) }}
      >
        directions
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    activities,
  } = state;

  return {
    planningTrip: activities.planningTrip,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FloatingButtons);
