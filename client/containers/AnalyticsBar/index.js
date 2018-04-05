import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/lib/Buttons';
import { CardText } from 'react-md/lib/Cards';
import Toolbar from 'react-md/lib/Toolbars';

import * as AppActions from 'actions';


const AnalyticsBar = (props) => {
  const {
    actions,
    analytics,
  } = props;

  if (analytics !== null) return null;

  return (
    <Toolbar
      className='analyticsbar'
      actions={[
        <Button
          flat
          primary
          onClick={actions.enableAnalytics}
        >
          okay
        </Button>,
        <Button
          flat
          primary
          onClick={actions.disableAnalytics}
        >
          turn off
        </Button>,
      ]}
      colored
      fixed
    >
      <CardText>
        AccessMap improves its services and conducts academic research using
        your experience on this website.
      </CardText>
    </Toolbar>
  );
};

AnalyticsBar.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  analytics: PropTypes.bool,
};

AnalyticsBar.defaultProps = {
  analytics: null,
};

const mapStateToProps = (state) => {
  const {
    analytics,
  } = state;

  return {
    analytics,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnalyticsBar);
