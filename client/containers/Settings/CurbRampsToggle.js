import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import SelectionControl from 'react-md/src/js/SelectionControls';

const CurbRampsToggle = (props) => {
  const {
    actions,
    requireCurbRamps,
  } = props;

  return (
    <SelectionControl
      type='switch'
      checked={requireCurbRamps}
      id='require_curbramps'
      label='Require curb ramps'
      name='require_curbramps_toggle'
      onChange={actions.toggleCurbRamps}
    />
  );
};

CurbRampsToggle.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  requireCurbRamps: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    profile,
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    requireCurbRamps: currentProfile.requireCurbRamps,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurbRampsToggle);
