import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
        onClick={() => actions.toggleTripPlanning(planningTrip)}
      >
        directions
      </Button>
    </div>
  );
};

FloatingButtons.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  planningTrip: PropTypes.bool,
};

FloatingButtons.defaultProps = {
  planningTrip: false,
};

const mapStateToProps = state => ({
  planningTrip: state.activities.planningTrip,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingButtons);
