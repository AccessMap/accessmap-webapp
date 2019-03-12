import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Button from "react-md/src/js/Buttons";
import Card from "react-md/src/js/Cards";

import * as AppActions from "actions";

const AnalyticsBar = props => {
  const { actions, analyticsStatus } = props;

  if (analyticsStatus !== null) return null;

  return (
    <Card className="analyticsbar">
      <span>Your use of AccessMap supports academic research.</span>
      <Button
        aria-label="got it"
        flat
        primary
        onClick={actions.enableAnalytics}
      >
        Got It
      </Button>
    </Card>
  );
};

AnalyticsBar.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  analyticsStatus: PropTypes.bool
};

AnalyticsBar.defaultProps = {
  analytics: null
};

const mapStateToProps = state => ({
  analyticsStatus: state.analytics.enabled
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalyticsBar);
