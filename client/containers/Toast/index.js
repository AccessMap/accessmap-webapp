import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Snackbar from 'react-md/lib/Snackbars';

const Toast = (props) => {
  const {
    actions,
    toasts,
  } = props;

  return (
    <Snackbar
      id='snackbar'
      toasts={toasts.map(t => ({
        text: t,
      }))}
      autohide={true}
      onDismiss={actions.popToast}
    />
  );
}

function mapStateToProps(state) {
  const {
    toasts,
  } = state;

  return {
    toasts: toasts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);
