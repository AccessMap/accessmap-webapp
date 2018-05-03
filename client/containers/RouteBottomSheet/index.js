import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Card from 'react-md/src/js/Cards';

import Directions from 'components/Directions';
import RouteInfo from 'components/RouteInfo';

import { routeResult as routeResultProps } from 'prop-schema';

const RouteBottomSheet = (props) => {
  const {
    actions,
    mediaType,
    routeResult,
    viewingDirections,
    viewingRouteInfo,
  } = props;

  if (!viewingDirections && !viewingRouteInfo) return null;
  if (mediaType !== 'mobile') return null;

  return (
    <div className='route-bottom-sheet'>
      <Card>
        {viewingDirections ?
          <Directions
            onClose={() => actions.closeDirections(routeResult)}
            routeResult={routeResult}
          /> :
          <RouteInfo
            onClose={() => actions.closeDirections(routeResult)}
            routeResult={routeResult}
          />
        }
      </Card>
    </div>
  );
};

RouteBottomSheet.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.string,
  routeResult: routeResultProps,
  viewingDirections: PropTypes.bool,
  viewingRouteInfo: PropTypes.bool,
};

RouteBottomSheet.defaultProps = {
  mediaType: 'desktop',
  routeResult: null,
  viewingDirections: false,
  viewingRouteInfo: false,
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  routeResult: state.route.routeResult,
  viewingDirections: state.activities.viewingDirections,
  viewingRouteInfo: state.activities.viewingRouteInfo,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RouteBottomSheet);
