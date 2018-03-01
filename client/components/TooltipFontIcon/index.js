import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import FontIcon from 'react-md/lib/FontIcons';
import { injectTooltip } from 'react-md/lib/Tooltips';

const styles = {
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '8px',
  },
};

// Note: has to be a PureComponent because wrapped component uses refs
/* eslint-disable react/prefer-stateless-function */
class TooltipFontIcon extends PureComponent {
  render() {
    const {
      children,
      className,
      iconClassName,
      tooltip,
    } = this.props;

    return (
      <div
        className={cn(className, 'tooltip-fonticon')}
        style={styles.tooltipContainer}
      >
        {tooltip}
        <FontIcon iconClassName={iconClassName}>{children}</FontIcon>
      </div>
    );
  }
}

TooltipFontIcon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  tooltip: PropTypes.node,
  iconClassName: PropTypes.string,
};

TooltipFontIcon.defaultProps = {
  className: '',
  children: null,
  tooltip: null,
  iconClassName: 'material-icons',
};

export default injectTooltip(TooltipFontIcon);
