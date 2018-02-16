/* WithScrollingContent.jsx */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { DialogContainer } from 'react-md/lib/Dialogs';
import * as AppActions from '../../actions';
import { bindActionCreators } from 'redux';
import ProfileList from './ProfileList'

function RoutingProfileManager (props) {
  const {
    actions,
    visible,
  } = props;

  const contentProps = {id: 'scrolling-content-dialog-content'};

  return (
    <DialogContainer
      id="scrolling-content-dialog"
      aria-describedby="scrolling-content-dialog-content"
      title='Routing Profiles'
      visible={visible}
      onHide={() => {}}
      actions={[
        {
          label: 'Close',
          primary: true,
          onClick: actions.closeRoutingProfileManager,
        }]}
      width={800}
      contentProps={contentProps}
    >
      <ProfileList/>
    </DialogContainer>
  );
}

function mapStateToProps (state) {
  return {
    visible: state.viewVisibility.showRoutingProfilePane,
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
)(RoutingProfileManager);