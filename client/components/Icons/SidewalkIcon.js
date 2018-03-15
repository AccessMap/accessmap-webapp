import React from 'react';
import PropTypes from 'prop-types';
import SVGIcon from 'react-md/lib/SVGIcons';


const SidewalkIcon = (props) => {
  const {
    fill,
    ...iconProps
  } = props;

  return (
    <SVGIcon
      className='sidewalk-icon'
      viewBox={'0 0 48 12'}
      {...iconProps}
    >
      <rect
        x='2'
        y='2'
        width='44'
        height='8'
        ry='3.44'
        opacity='0.97'
        stroke='#000'
        strokeWidth='.5'
        fill={fill}
      />
    </SVGIcon>
  );
};

SidewalkIcon.propTypes = {
  fill: PropTypes.string,
};

SidewalkIcon.defaultProps = {
  fill: 'none',
};

export default SidewalkIcon;
