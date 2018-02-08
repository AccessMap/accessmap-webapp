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
import OmniCard from 'containers/OmniCard';

import AccessMapBrand from 'components/AccessMapBrand';
import ContextMenu from 'components/ContextMenu';
import FeatureCard from 'components/FeatureCard';

import * as AppActions from 'actions';
import './style.scss';


const CLICKABLE_LAYERS = ['sidewalk', 'crossing-ramps', 'crossing-noramps'];


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
      mode,
      planningTrip,
      selectedFeature,
    } = this.props;

    const mobile = mediaType == 'MOBILE';
    const tablet = mediaType == 'TABLET';
    const desktop = mediaType == 'DESKTOP';

    const topToolbarHeight = mobile ? 56 : 64;

    return (
      <div style={{ height: '100%' }}>
        <div className='map-container'>
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
          <AccessMap
            containerStyle={{
              width: '100%',
              height: '100%',
            }}
            mode={mode === 'DOWNHILL' ? 'downhill' : 'uphill'}
            onMoveEnd={(m, e) => {
              const newBounds = m.getBounds().toArray();
              const bbox = [
                newBounds[0][0],
                newBounds[0][1],
                newBounds[1][0],
                newBounds[1][1]
              ];

              if (e.originalEvent) {
                const { lng, lat } = m.getCenter();
                actions.mapMove([lng, lat], m.getZoom(), bbox);
              } else {
                actions.logBounds(bbox);
              }
            }}
            onContextMenu={(m, e) => {
              const { lng, lat } = e.lngLat;
              actions.mapContextClick(lng, lat);
            }}
            onMouseMove={(m, e) => {
              const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
              const features = m.queryRenderedFeatures(e.point, {
                layers: layers,
              });
              m.getCanvas().style.cursor = features.length ? 'pointer': 'default';
            }}
            onDrag={(m, e) => {
              m.getCanvas().style.cursor = 'grabbing';
            }}
            onClick={(m, e) => {
              const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
              const features = m.queryRenderedFeatures(e.point, {
                layers: CLICKABLE_LAYERS
              });
              actions.mapClick(features);
            }}
            onStyleLoad={(m) => {
              // TODO: run this earlier - right after mapbox style load
              const newBounds = m.getBounds().toArray();
              const bbox = [
                newBounds[0][0],
                newBounds[0][1],
                newBounds[1][0],
                newBounds[1][1]
              ];
              actions.logBounds(bbox);
            }}
          />
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              padding: 10,
              margin: 10
            }}
          >
            <Button
              style={{ display: 'block', margin: 15 }}
              floating
              secondary
              onClick={actions.toggleGeolocation}
            >
              gps_fixed
            </Button>
            <Button
              style={{ display: 'block', margin: 15 }}
              floating
              secondary
              onClick={d => { actions.toggleTripPlanning(planningTrip) }}
            >
              directions
            </Button>
          </div>
        </div>
        <OmniCard
          style={{
            position: 'absolute',
            margin: '8px',
            left: 0,
            top: `${topToolbarHeight}px`,
          }}
        />
        { selectedFeature &&
          <FeatureCard
            title={selectedFeature.layerName}
            featureProperties={Object.values(selectedFeature.properties)}
            onClickClose={() => actions.clearSelectedFeatures()}
          />
        }
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
      </div>
    );
  }
}

App.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  mode: PropTypes.string,
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
  mode: null,
  planningTrip: false,
};

function mapStateToProps(state) {
  const {
    map,
    mode,
    tripplanning,
  } = state;

  return {
    contextClick: map.contextClick,
    mode: mode,
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
