import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-md/lib/Sliders';


// TODO: inherit from Slider so that state can be accessed, add defaultProps
export default function InclineSlider(props) {
  const {
    id,
    label,
    incline,
    min,
    max,
    step,
    valuePrecision,
    onChange
  } = props;

  return (
    <Slider
      discrete
      id={id}
      label={`${label}: ${(incline * 100).toFixed(1)}%`}
      defaultValue={+(incline * 100).toFixed(1)}
      min={min}
      max={max}
      step={step}
      valuePrecision={valuePrecision}
      onChange={onChange}
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
};

InclineSlider.defaultProps = {
  id: 'incline-slider',
  incline: '0.05',
  min: 0,
  max: 10,
  step: 0.5,
  valuePrecision: 1,
  onChange: null
};
