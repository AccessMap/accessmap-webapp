import React from 'react';
import PropTypes from 'prop-types';

import Dialog from 'react-md/lib/Dialogs';
import List, { ListItem } from 'react-md/lib/Lists';


const ContextMenu = (props) => {
  const {
    visible,
    onClickOrigin,
    onClickDestination,
    onClickCancel,
  } = props;

  return (
    <Dialog
      id='context-dialog'
      visible={visible}
      title='Set waypoint?'
      onHide={onClickCancel}
    >
      <List>
        <ListItem
          id='set-origin'
          primaryText='Set origin'
          onClick={onClickOrigin}
        />
        <ListItem
          id='set-destination'
          primaryText='Set destination'
          onClick={onClickDestination}
        />
        <ListItem
          id='cancel'
          primaryText='Cancel'
          onClick={onClickCancel}
        />
      </List>
    </Dialog>
  );
};

ContextMenu.propTypes = {
  onClickCancel: PropTypes.func,
  onClickDestination: PropTypes.func,
  onClickOrigin: PropTypes.func,
  visible: PropTypes.bool,
};

ContextMenu.defaultProps = {
  onClickCancel: null,
  onClickDestination: null,
  onClickOrigin: null,
  visible: false,
};

export default ContextMenu;
