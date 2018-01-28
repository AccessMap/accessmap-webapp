import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SVGIcon from 'components/SVGIcon';

import AccessMapIcon from './AccessMapIcon';
import AccessMapLogo from './AccessMapLogo';


export default function AccessMapBrand(props) {
  const {
    className,
    height,
    width,
    primary,
    secondary,
    background,
    backgroundTransparent,
    mini,
    style
  } = props;

  if (mini) {
    return (
      <AccessMapIcon
        primary={primary}
        secondary={secondary}
        width={width}
        height={height}
      />
    );
  } else {
    return (
      <AccessMapLogo
        primary={primary}
        secondary={secondary}
        width={width}
        height={height}
      />
    );
  }
}

AccessMapBrand.propTypes = {
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

AccessMapBrand.defaultProps = {
  className: 'accessmap-brand',
  width: 650,
  height: 125,
  primary: '#1b4274',
  secondary: '#85ba41',
  background: '#fff',
  backgroundTransparent: false,
  mini: false,
  style: {}
};
