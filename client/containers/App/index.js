import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import { AccessibleFakeButton } from 'react-md/lib/Helpers';
import Avatar from 'react-md/lib/Avatars';
import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import Toolbar from 'react-md/lib/Toolbars';

import AccessMap from 'containers/AccessMap';

import AccessMapBrand from 'components/AccessMapBrand';
import ContextMenu from 'components/ContextMenu';
import FeatureCard from 'components/FeatureCard';
import GeocoderAutocomplete from 'components/GeocoderAutocomplete';
import PreferenceCard from 'components/PreferenceCard';

import * as AppActions from 'actions';
import './style.scss';


const CLICKABLE_LAYERS = ['sidewalk', 'crossing-ramps', 'crossing-noramps'];


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.resizeWindow();
    window.addEventListener('resize', this.props.actions.resizeWindow);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.actions.resizeWindow);
  }

  render() {
    const {
      actions,
      mediaType,
      origin,
      destination,
      searchText,
      originText,
      destinationText,
      planningTrip,
      mode,
      inclineMax,
      inclineMin,
      inclineIdeal,
      requireCurbRamps,
      center,
      bounds,
      selectedFeature,
      contextClick,
    } = this.props;

    const mobile = mediaType == 'MOBILE';
    const tablet = mediaType == 'TABLET';
    const desktop = mediaType == 'DESKTOP';

    const topToolbarHeight = mobile ? 56 : 64;

    const searchGeocoder = (
      <GeocoderAutocomplete
        id='address_search'
        key='address_search'
        placeholder='Search address'
        block
        className='md-title--toolbar'
        inputClassName='md-text-field--toolbar'
        onAutocomplete={(label, index, data) => {
          const poi = data[index];
          actions.setPOI(poi.location[0], poi.location[1], poi.name);
          actions.setSearchText(label);
        }}
        proximity={center}
        onChange={(v) => { actions.setSearchText(v); }}
        value={searchText}
        style={{
          marginLeft: 0
        }}
      />
    );

    const originGeocoder = (
      <GeocoderAutocomplete
        style={{ paddingLeft: 16 }}
        id='origin-geocoder'
        key='origin-geocoder'
        placeholder='Start address'
        block
        className='md-title--toolbar'
        inputClassName='md-text-field--toolbar'
        proximity={center}
        onAutocomplete={(label, index, data) => {
          actions.setOriginText(label);
          const origin = data[index];
          actions.setOrigin(origin.location[0], origin.location[1],
                            origin.name);
        }}
        onChange={(v) => { actions.setOriginText(v); }}
        value={originText}
        style={{
          marginLeft: 0
        }}
      />
    );

    const destinationGeocoder = (
      <GeocoderAutocomplete
        style={{ paddingLeft: 16 }}
        id='destination-geocoder'
        key='destination-geocoder'
        placeholder='End address'
        block
        className='md-title--toolbar'
        inputClassName='md-text-field--toolbar'
        proximity={center}
        onAutocomplete={(label, index, data) => {
          actions.setDestinationText(label);
          const destination = data[index];
          actions.setDestination(
            destination.location[0],
            destination.location[1],
            destination.name
          );
        }}
        onChange={(v) => { actions.setDestinationText(v); }}
        value={destinationText}
        style={{
          marginLeft: 0
        }}
      />
    );

    let bottom = false;
    let nav;
    let topTitle;
    let topActions;
    let topChildren;
    let bottomActions;
    let bottomChildren;
    if (planningTrip) {
      // In routing mode
      bottom = true;
      topActions = [
        <Button
          onClick={() => actions.tripPlanningOff()}
          key='tripplanning--close'
          icon
        >
          close
        </Button>
      ];

      topChildren = [
        <FontIcon
          key='search-icon'
          className={cn('md-btn--toolbar md-btn--icon')}
        >
          search
        </FontIcon>,
        originGeocoder,
      ];
      bottomActions = [
        <Button
          className='md-btn--toolbar'
          key='tripplanning--swap-waypoints'
          icon
          onClick={() => {
            actions.swapWaypoints(origin, destination);
          }}
        >
          swap_vert
        </Button>,
      ];
      bottomChildren = [
        <FontIcon
          key='search-icon'
          className={cn('md-btn--toolbar md-btn--icon')}
        >
          search
        </FontIcon>,
        destinationGeocoder,
      ];
    } else {
      topTitle = (
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
      );
      topActions =[
        <AccessibleFakeButton>
          <Avatar className={cn('md-toolbar--action-right')}>U</Avatar>
        </AccessibleFakeButton>
      ];
      topChildren = [
        <FontIcon
          key='search-icon'
          className={cn('md-btn--toolbar md-btn--icon')}
        >
          search
        </FontIcon>,
        searchGeocoder,
      ];
    }

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
            inclineMax={inclineMax}
            inclineMin={inclineMin}
            inclineIdeal={inclineIdeal}
            requireCurbRamps={requireCurbRamps}
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
              onClick={() => {
                if (planningTrip) {
                  actions.tripPlanningOff();
                } else {
                  actions.tripPlanningOn();
                }
              }}
            >
              directions
            </Button>
          </div>
        </div>
        <PreferenceCard
          style={{
            position: 'absolute',
            margin: '8px',
            left: 0,
            top: `${bottom ? 2 * topToolbarHeight : topToolbarHeight}px`,
          }}
          inclineMin={inclineMin}
          inclineMax={inclineMax}
          curbramps={requireCurbRamps}
          onUphillChange={d => actions.setInclineMax(d / 100)}
          onDownhillChange={d => actions.setInclineMin(-d / 100)}
          onCurbRampsChange={actions.toggleCurbRamps}
          onDownhillMouseEnter={actions.mouseOverDownhill}
          onDownhillMouseLeave={actions.mouseOutDownhill}
        />
        { selectedFeature &&
          <FeatureCard
            title={selectedFeature.layerName}
            featureProperties={Object.values(selectedFeature.properties)}
            onClickClose={() => actions.clearSelectedFeatures()}
          />
        }
        <Toolbar
          className={bottom ? 'md-paper--0' : 'md-paper--1'}
          title={topTitle}
          themed
          nav={nav}
          actions={topActions}
          fixed
          zDepth={0}
        >
          {topChildren}
        </Toolbar>
        { bottom &&
          <Toolbar
            className='md-paper--1'
            style={{
              position: 'fixed',
              width: '100%',
              top: 0,
              marginTop: topToolbarHeight,
            }}
            themed
            actions={bottomActions}
            zDepth={0}
          >
            {bottomChildren}
          </Toolbar>
        }
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
  origin: PropTypes.shape({
    type: PropTypes.oneOf(['Feature']).isRequired,
    geometry: PropTypes.shape({
      type: PropTypes.oneOf(['Point']).isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    properties: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  destination: PropTypes.shape({
    type: PropTypes.oneOf(['Feature']).isRequired,
    geometry: PropTypes.shape({
      type: PropTypes.oneOf(['Point']).isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
    }),
    properties: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }),
  planningTrip: PropTypes.bool,
  inclineMax: PropTypes.number.isRequired,
  inclineMin: PropTypes.number.isRequired,
  inclineIdeal: PropTypes.number.isRequired,
  requireCurbRamps: PropTypes.bool.isRequired,
  center: PropTypes.arrayOf(PropTypes.number),
  selectedFeature: PropTypes.shape({
    type: PropTypes.string,
    info: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    }),
  }),
  mode: PropTypes.string
};

App.defaultProps = {
  origin: null,
  destination: null,
  planningTrip: false,
  inclineMax: 0.1,
  inclineMin: -0.0833,
  inclineIdeal: -0.01,
  requireCurbRamps: true,
  center: [-122.333592, 47.605628],
  selectedFeature: null,
  mode: null
};

function mapStateToProps(state) {
  const {
    log,
    map,
    mode,
    tripplanning,
    view,
    waypoints,
  } = state;

  return {
    planningTrip: tripplanning.planningTrip,
    origin: waypoints.origin,
    destination: waypoints.destination,
    poi: waypoints.poi,
    searchText: tripplanning.geocoderText.searchText,
    originText: tripplanning.geocoderText.originText,
    destinationText: tripplanning.geocoderText.destinationText,
    inclineMax: tripplanning.inclineMax,
    inclineMin: tripplanning.inclineMin,
    inclineIdeal: tripplanning.inclineIdeal,
    requireCurbRamps: tripplanning.requireCurbRamps,
    center: [view.lng, view.lat],
    bounds: log.bounds,
    selectedFeature: map.selectedFeature,
    contextClick: map.contextClick,
    mode: mode,
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
