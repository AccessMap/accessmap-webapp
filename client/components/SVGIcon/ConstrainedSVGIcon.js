import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SVGIcon from './SVGIcon';


export default function ConstrainedSVGIcon(props) {
  const {
    svgMinX,
    svgMinY,
    svgWidth,
    svgHeight,
    width,
    height,
    children,
    ...moreProps
  } = props;

  const aspectRatio = (svgWidth - svgMinX) / (svgHeight - svgMinY);
  const newWidth = height * aspectRatio;
  const newHeight = width / aspectRatio;
  const constrainedHeight = Math.min(height, newHeight);
  const constrainedWidth = Math.min(width, newWidth);

  return (
    <SVGIcon
      svgMinX={svgMinX}
      svgMinY={svgMinY}
      svgWidth={svgWidth}
      svgHeight={svgHeight}
      height={constrainedHeight}
      width={constrainedWidth}
      {...moreProps}
    >
      {children}
    </SVGIcon>
  );
};

ConstrainedSVGIcon.propTypes = {
  svgMinX: PropTypes.number.isRequired,
  svgMinY: PropTypes.number.isRequired,
  svgWidth: PropTypes.number.isRequired,
  svgHeight: PropTypes.number.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  children: PropTypes.node,
};

ConstrainedSVGIcon.defaultProps = {
  className: '',
  fill: '#000',
  height: 24,
  width: 24,
  children: [],
};
