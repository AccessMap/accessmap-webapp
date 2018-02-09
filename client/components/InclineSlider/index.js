import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-md/lib/Sliders';

import './style.scss';


export default function InclineSlider(props) {
  const {
    id,
    label,
    incline,
    min,
    max,
    step,
    valuePrecision,
    onChange,
    onMouseEnter,
    onMouseLeave,
    controlled
  } = props;

  const inclineValue = +(incline * 100).toFixed(1);

  return (
    <Slider
      discrete
      id={id}
      label={`${label}: ${inclineValue}%`}
      defaultValue={inclineValue}
      min={min}
      max={max}
      step={step}
      valuePrecision={valuePrecision}
      onChange={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      value={controlled ? inclineValue : undefined}
    />
  );
}

InclineSlider.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  incline: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  valuePrecision: PropTypes.number,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  controlled: PropTypes.bool,
};

InclineSlider.defaultProps = {
  id: 'incline-slider',
  incline: '0.05',
  min: 0,
  max: 10,
  step: 0.5,
  valuePrecision: 1,
  onChange: null,
  onMouseEnter: null,
  onMouseLeave: null,
  controlled: false,
};
