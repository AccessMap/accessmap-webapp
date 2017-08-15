import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';


export default function SVGIcon(props) {
  const {
    className,
    fill,
    height,
    width,
    viewBox,
    children,
    style
  } = props;
  return (
    <svg
      className={cn(className)}
      fill={fill}
      height={height}
      width={width}
      viewBox={viewBox}
      style={style}
    >
      {children}
    </svg>
  );
}

SVGIcon.defaultProps = {
  className: '',
  fill: '#000',
  height: 24,
  width: 24,
  children: [],
  style: {}
};

SVGIcon.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  viewBox: PropTypes.string.isRequired,
  children: PropTypes.node,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object
  /* eslint-enable react/forbid-prop-types */
};
