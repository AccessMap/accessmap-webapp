import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ConstrainedSVGIcon from 'components/SVGIcon/ConstrainedSVGIcon';


export default function AccessMapIcon(props) {
  const {
    className,
    width,
    height,
    primary,
    secondary,
    background,
    backgroundTransparent,
    style
  } = props;

  return (
    <ConstrainedSVGIcon
      className={cn(className)}
      svgMinX={0}
      svgMinY={0}
      svgWidth={125}
      svgHeight={125}
      width={width}
      height={height}
      style={style}
    >
      <path
        key='accessmapicon-background'
        className='accessmapicon-background'
        fill={background}
        fillOpacity={backgroundTransparent ? 0 : 1}
        d='m33.71 10.934c-13.958 0-25.271 11.313-25.271 25.271v52.59c0 13.957 11.313 25.271 25.271 25.271h52.59c13.957 0 25.271-11.315 25.271-25.271v-52.59c0-13.958-11.315-25.271-25.271-25.271h-52.59'
    />
    <g
      key='accessmapicon-primary'
      className='accessmapicon-primary'
      fill={primary}
    >
      <path
        key='accessmapicon-head'
        d='m88.992 28.817c0 3.717-3.013 6.728-6.728 6.728-3.716 0-6.728-3.011-6.728-6.728 0-3.716 3.012-6.727 6.728-6.727 3.715 0 6.728 3.011 6.728 6.727'
      />
      <path
        key='accessmapicon-arm'
        d='m75.338 51.135c-1.497-0.071-2.886-0.798-3.797-1.987-4.092-5.192-10.392-8.518-17.544-8.518-3.978 0-7.676 1.028-10.898 2.834-1.587 0.919-3.545 0.913-5.126-0.017-1.58-0.93-2.538-2.638-2.506-4.471 0.033-1.834 1.049-3.508 2.661-4.381 4.693-2.631 10.127-4.134 15.869-4.134 10.324 0 19.585 4.85 25.53 12.393 1.263 1.557 1.493 3.71 0.588 5.498s-2.776 2.878-4.777 2.783'
      />
      <path
        key='accessmapicon-wheel'
        d='m54.442 96.414c-17.886 0-32.496-14.608-32.496-32.493 0-5.703 1.484-11.1 4.08-15.772 0.865-1.621 2.537-2.65 4.374-2.691 1.837-0.04 3.553 0.913 4.489 2.495 0.935 1.582 0.944 3.545 0.024 5.135-1.784 3.209-2.798 6.881-2.798 10.833 0 12.39 9.937 22.327 22.327 22.327 5.577 0 10.618-2.021 14.528-5.376h0.003c2.765-2.373 4.941-5.408 6.282-8.851 0.645-1.712 2.16-2.946 3.968-3.23 1.807-0.285 3.628 0.424 4.768 1.856 1.139 1.432 1.422 3.366 0.739 5.063-1.957 5.025-5.123 9.434-9.139 12.879-5.679 4.873-13.1 7.825-21.149 7.825'
      />
      <path
        key='accessmapicon-leg'
        d='m93.121 95.571c-1.676 0.033-3.261-0.762-4.236-2.126l-12.637-17.151c-1.132-1.459-1.383-3.417-0.658-5.115 0.726-1.697 2.315-2.868 4.152-3.059 1.836-0.19 3.632 0.631 4.69 2.144l12.639 17.151c1.156 1.523 1.36 3.567 0.526 5.289s-2.564 2.83-4.476 2.867'
      />
      <path
        key='accessmapicon-outline'
        d='m33.228 119.26c-16.507 0-29.978-13.48-29.978-29.983 0.0002 0 0.0002-53.554 0.0002-53.554 0-16.507 13.472-29.978 29.978-29.978 0-0.0004 53.552-0.0004 53.552-0.0004 16.51 0 29.98 13.471 29.98 29.978v53.554c0 16.503-13.47 29.983-29.98 29.983h-53.552m0-8.49h53.552c11.92 0 21.49-9.57 21.49-21.493v-53.554c0-11.921-9.57-21.492-21.49-21.492h-53.552c-11.921 0-21.491 9.571-21.491 21.492v53.554c0 11.923 9.571 21.493 21.491 21.493'
      />
    </g>
  </ConstrainedSVGIcon>
  );
}

AccessMapIcon.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  background: PropTypes.string,
  backgroundTransparent: PropTypes.bool,
  mini: PropTypes.bool,
  /* eslint-disable react/forbid-prop-types */
  style: PropTypes.object
  /* eslint-enable react/forbid-prop-types */
};

AccessMapIcon.defaultProps = {
  className: 'accessmap-icon',
  width: 125,
  height: 125,
  primary: '#1b4274',
  secondary: '#85ba41',
  background: '#fff',
  backgroundTransparent: false,
  mini: false,
  style: {}
};
