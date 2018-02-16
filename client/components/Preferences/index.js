/* WithScrollingContent.jsx */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { DialogContainer } from 'react-md/lib/Dialogs';
import { Switch } from 'react-md/lib/SelectionControls';
import * as AppActions from '../../actions';
import { bindActionCreators } from 'redux';

function UserPreferences (props) {
  const {
    actions,
    visible,
    preferences,
  } = props;

  const contentProps = {id: 'scrolling-content-dialog-content'};

  return (
    <DialogContainer
      id="scrolling-content-dialog"
      aria-describedby="scrolling-content-dialog-content"
      title='Preferences'
      visible={visible}
      onHide={actions.closeUserPreferences}
      actions={[
        {
          label: 'Close',
          primary: true,
          onClick: actions.closeUserPreferences,
        }]}
      contentProps={contentProps}
    >
      <Switch
        id="switch-toggle-tracking"
        type="switch"
        label="Tracking"
        name="toggleTracking"
        checked={preferences.enableTracking}
        onChange={actions.toggleTracking}
      />
    </DialogContainer>
  );
}

function mapStateToProps (state) {
  return {
    visible: state.viewVisibility.showUserSettingsPane,
    preferences: state.userpreference,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPreferences);