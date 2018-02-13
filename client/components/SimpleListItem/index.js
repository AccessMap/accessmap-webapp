import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';


const SimpleListItem = (props) => {
  const {
    children,
    className,
  } = props;

  return (
    <li className={ cn(className, 'md-list-item') }>
      <div className='md-list-tile'>
        { children }
      </div>
    </li>
  );
};

SimpleListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SimpleListItem;
