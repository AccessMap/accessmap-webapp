import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import { AccessibleFakeButton } from 'react-md/lib/Helpers';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';

import AccessMap from 'containers/AccessMap';
import FloatingButtons from 'containers/FloatingButtons';
import OmniCard from 'containers/OmniCard';

import AccessMapBrand from 'components/AccessMapBrand';
import ContextMenu from 'components/ContextMenu';
import FeatureCard from 'components/FeatureCard';

import * as AppActions from 'actions';
import './style.scss';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.loadApp();
    window.addEventListener('resize', this.props.actions.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.actions.resizeWindow);
  }

  render() {
    const {
      actions,
      contextClick,
      mediaType,
      planningTrip,
      selectedFeature,
    } = this.props;

    const mobile = mediaType == 'MOBILE';
    const tablet = mediaType == 'TABLET';
    const desktop = mediaType == 'DESKTOP';

    return (
      <React.Fragment>
        <Toolbar
          className={'md-paper--1'}
          title={
            <div
              className='accessmap-title'
              key='accessmap-brand'
            >
              <AccessMapBrand
                secondary='#448aff'
                height={mobile ? 32 : 24}
                primary='#0d47a1'
                backgroundTransparent
                mini={mobile}
                className='accessmap-toolbar-icon'
              />
            </div>
          }
          themed
          actions={
            <AccessibleFakeButton>
              <Avatar className={cn('md-toolbar--action-right')}>U</Avatar>
            </AccessibleFakeButton>
          }
          fixed
          zDepth={0}
        />
        <div className='map-container'>
          <AccessMap
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
          />
          <ContextMenu
            visible={contextClick === null ? false : true}
            onClickCancel={actions.cancelContext}
            onClickOrigin={() => {
              actions.setOrigin(contextClick.lng,
                                contextClick.lat,
                                'Custom origin');
            }}
            onClickDestination={() => {
              actions.setDestination(contextClick.lng,
                                     contextClick.lat,
                                     'Custom destination');
            }}
          />
          { selectedFeature &&
            <FeatureCard
              className='feature-card'
              title={selectedFeature.layerName}
              featureProperties={Object.values(selectedFeature.properties)}
              onClickClose={() => actions.clearSelectedFeatures()}
            />
          }
          <OmniCard />
          <FloatingButtons />
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  planningTrip: PropTypes.bool,
  selectedFeature: PropTypes.shape({
    type: PropTypes.string,
    info: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    }),
  }),
};

App.defaultProps = {
  selectedFeature: null,
  planningTrip: false,
};

function mapStateToProps(state) {
  const {
    map,
    tripplanning,
  } = state;

  return {
    contextClick: map.contextClick,
    planningTrip: tripplanning.planningTrip,
    selectedFeature: map.selectedFeature,
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
)(App);
