import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Slider from 'react-md/src/js/Sliders';

const DownhillSlider = (props) => {
  const {
    actions,
    inclineMin,
  } = props;

  const downhillPercent = +(-inclineMin * 100).toFixed(1);

  return (
    <Slider
      discrete
      id='downhill-slider'
      label={`Avoid downhill steepness below ${downhillPercent}%`}
      defaultValue={downhillPercent}
      min={4}
      max={15}
      step={0.5}
      valuePrecision={1}
      onChange={d => actions.setInclineMin(-d / 100)}
      value={downhillPercent}
    />
  );
};

DownhillSlider.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  inclineMin: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const {
    routingprofile,
  } = state;

  const profile = routingprofile.profiles[routingprofile.selectedProfile];

  return {
    inclineMin: profile.inclineMin,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DownhillSlider);
