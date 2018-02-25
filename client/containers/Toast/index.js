import React from 'react';
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
      autohide
      onDismiss={actions.popToast}
    />
  );
};

Toast.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  toasts: state.toasts,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast);
