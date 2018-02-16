import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';
import Card, { CardActions, CardText } from 'react-md/lib/Cards';

const AnalyticsDialog = (props) => {
  const {
    actions,
    analytics,
  } = props;

  if (analytics !== null) {
    return null;
  }

  return (
    <div
      className='analytics-dialog-container'
      style={{
        position: 'absolute',
        bottom: 0,
        zIndex: 40,
        width: '100%',
      }}
    >
      <Card
        style={{
          width: '70%',
        }}
      >
        <CardText style={{ paddingBottom: '8px' }}>
          AccessMap uses your behavior for research and improving the site.
        </CardText>
        <CardActions>
          <Button
            flat
            primary
            onClick={actions.enableAnalytics}
          >
            Yes, use my clicks
          </Button>
          <Button
            flat
            secondary
            onClick={actions.disableAnalytics}
          >
            No, don't track me
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

function mapStateToProps(state) {
  const {
    analytics
  } = state;

  return {
    analytics: analytics,
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
)(AnalyticsDialog);
