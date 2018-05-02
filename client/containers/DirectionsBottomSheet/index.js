import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/src/js/Buttons';
import Card, { CardText } from 'react-md/src/js/Cards';
import Toolbar from 'react-md/src/js/Toolbars';

import DirectionsList from 'components/DirectionsList';

import { routeResult as routeResultProps } from 'prop-schema';

const DirectionsBottomCard = (props) => {
  const {
    actions,
    mediaType,
    routeResult,
    viewingDirections,
  } = props;

  if (!viewingDirections) return null;
  if (mediaType !== 'mobile') return null;

  return (
    <div className='directions-bottom-sheet'>
      <Card>
        <Toolbar
          title='Directions'
          actions={[
            <Button
              icon
              onClick={() => actions.closeDirections(routeResult)}
            >
              close
            </Button>,
          ]}
        />
        <CardText className='directions--steps'>
          <DirectionsList routeResult={routeResult} />
        </CardText>
      </Card>
    </div>
  );
};

DirectionsBottomCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.string,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
};

DirectionsBottomCard.defaultProps = {
  mediaType: 'desktop',
  routeResult: null,
  viewingDirections: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  routeResult: state.route.routeResult,
  viewingDirections: state.activities.viewingDirections,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DirectionsBottomCard);
