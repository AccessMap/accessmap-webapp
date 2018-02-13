import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';


export default function SVGIcon(props) {
  const {
    className,
    fill,
    svgMinX,
    svgMinY,
    svgWidth,
    svgHeight,
    height,
    width,
    children,
    style
  } = props;

  const viewBox = `${svgMinX} ${svgMinY} ${svgWidth} ${svgHeight}`;

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

SVGIcon.propTypes = {
  className: PropTypes.string,
  svgMinX: PropTypes.number.isRequired,
  svgMinY: PropTypes.number.isRequired,
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.node,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object
  /* eslint-enable react/forbid-prop-types */
};

SVGIcon.defaultProps = {
  className: '',
  fill: '#000',
  height: 24,
  width: 24,
  children: [],
  style: {}
};
