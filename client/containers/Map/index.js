import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import mapConstants from 'constants/map';

import cn from 'classnames';

import ReactMapboxGl from 'react-mapbox-gl';

import * as AppActions from 'actions';

import Sources from './sources';

import Crossings from './layers-crossings';
import Elevators from './layers-elevators';
import Footways from './layers-footways';
import Kerbs from './layers-kerbs';
import Sidewalks from './layers-sidewalks';
import Stairs from './layers-stairs';

import Geolocation from './layers-geolocation';
import Route from './layers-route';
import Waypoints from './layers-waypoints';

const CLICKABLE_LAYERS = [
  'crossing-click',
  'elevator-paths-click',
  'sidewalk-click',
];

const MapboxGL = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN,
  minZoom: 10,
  maxZoom: 20,
  bearing: [0],
  pitch: [0],
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: [15],
      width: 0,
      height: 0,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    const width = this.mapEl.container.clientWidth;
    const height = this.mapEl.container.clientHeight;
    if (this.state.width !== width || this.state.height !== height) {
      this.setState({
        width,
        height,
      });
      this.props.actions.resizeMap(width, height);
    }
  }

  handleClick(m, e) {
    if (this.props.viewingDirections) return;

    const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
    const features = m.queryRenderedFeatures(e.point, {
      layers,
    });
    const point = [e.lngLat.lng, e.lngLat.lat];

    this.props.actions.mapClick(features, point);
  }

  render() {
    const {
      actions,
      lon,
      lat,
      mediaType,
      viewingDirections,
      zoom,
      ...props
    } = this.props;

    // NOTE: Do not create actions that modify the `view` substate via
    // onMoveEnd or onZoomEnd. If you do, it creates an infinite loop.
    return (
      <MapboxGL
        className={cn('map mapboxgl-map', {
          directions: (mediaType === 'mobile') && viewingDirections,
        })}
        ref={(el) => { this.mapEl = el; }}
        center={[lon, lat]}
        zoom={[zoom]}
        bearing={[0]}
        pitch={[0]}
        maxBounds={mapConstants.bounds}
        /* eslint-disable react/style-prop-object */
        style='mapbox://styles/accessmap/cjglbmftk00202tqmpidtfxk3'
        /* eslint-enable react/style-prop-object */
        onMoveEnd={(m, e) => {
          const newBounds = m.getBounds().toArray();
          const bbox = [
            newBounds[0][0],
            newBounds[0][1],
            newBounds[1][0],
            newBounds[1][1],
          ];

          if (e.originalEvent) {
            const center = m.getCenter();
            actions.mapMove(center.lng, center.lat, m.getZoom(), bbox);
          }
        }}
        onMouseMove={(m, e) => {
          const layers = CLICKABLE_LAYERS.filter(l => m.getLayer(l));
          const features = m.queryRenderedFeatures(e.point, {
            layers,
          });
          m.getCanvas().style.cursor = features.length ? 'pointer' : 'default';
        }}
        onDrag={(m) => { m.getCanvas().style.cursor = 'grabbing'; }}
        onClick={this.handleClick}
        onStyleLoad={(m) => {
          // TODO: run this earlier - right after mapbox style load
          const newBounds = m.getBounds().toArray();
          const bbox = [
            newBounds[0][0],
            newBounds[0][1],
            newBounds[1][0],
            newBounds[1][1],
          ];
          const center = m.getCenter();
          actions.loadMap(center.lng, center.lat, m.getZoom(), bbox);
        }}

        {...props}
      >

        <Sources />

        <Stairs />
        <Crossings />
        <Route before='crossing-click' />
        <Sidewalks />
        <Footways />
        <Kerbs />
        <Elevators />
        <Waypoints />
        <Geolocation />
      </MapboxGL>
    );
  }
}

Map.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  lon: PropTypes.number,
  lat: PropTypes.number,
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  viewingDirections: PropTypes.bool,
  zoom: PropTypes.number,
};

Map.defaultProps = {
  lon: mapConstants.lon,
  lat: mapConstants.lat,
  mediaType: 'mobile',
  viewingDirections: false,
  zoom: mapConstants.zoom,
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
    router,
  } = state;

  const mapParams = router.route ? router.route.params : null;

  return {
    lon: mapParams ? mapParams.lon : undefined,
    lat: mapParams ? mapParams.lat : undefined,
    mediaType: browser.mediaType,
    viewingDirections: activities.viewingDirections,
    zoom: mapParams ? mapParams.zoom : undefined,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
