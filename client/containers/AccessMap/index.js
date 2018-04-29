import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import ReactMapboxGl from 'react-mapbox-gl';

import * as AppActions from 'actions';

import PedestrianSource from './source-pedestrian';

import Crossings from './layers-crossings';
import ElevatorPaths from './layers-elevator-paths';
import Geolocation from './layers-geolocation';
import Route from './layers-route';
import Sidewalks from './layers-sidewalks';
import Waypoints from './layers-waypoints';

const CLICKABLE_LAYERS = [
  'crossing-click',
  'elevator-paths-click',
  'sidewalk-click',
];

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN,
  minZoom: 10,
  maxZoom: 20,
  bearing: [0],
  pitch: [0],
});

class AccessMap extends Component {
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
      center,
      mediaType,
      viewingDirections,
      zoom,
      ...props
    } = this.props;

    // NOTE: Do not create actions that modify the `view` substate via
    // onMoveEnd or onZoomEnd. If you do, it creates an infinite loop.
    return (
      <Map
        className={cn('accessmap mapboxgl-map', {
          directions: (mediaType === 'mobile') && viewingDirections,
        })}
        ref={(el) => { this.mapEl = el; }}
        center={center}
        zoom={[zoom]}
        bearing={[0]}
        pitch={[0]}
        maxBounds={[
          [
            -122.71446096536938,
            47.40689742599213,
          ],
          [
            -121.9073424946721,
            47.8092130645955,
          ],
        ]}
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
            const { lng, lat } = m.getCenter();
            actions.mapMove([lng, lat], m.getZoom(), bbox);
          } else {
            actions.logBounds(bbox);
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
          actions.logBounds(bbox);
        }}

        {...props}
      >

        <PedestrianSource />

        <Crossings />
        <ElevatorPaths />
        <Route before='crossing-click' />
        <Sidewalks />
        <Waypoints />
        <Geolocation />
      </Map>
    );
  }
}

AccessMap.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  /* eslint-disable react/require-default-props */
  actions: PropTypes.object.isRequired,
  /* eslint-enable react/forbid-prop-types */
  /* eslint-enable react/require-default-props */
  center: PropTypes.arrayOf(PropTypes.number),
  mediaType: PropTypes.oneOf(['mobile', 'tablet', 'desktop']),
  viewingDirections: PropTypes.bool,
  zoom: PropTypes.number,
};

AccessMap.defaultProps = {
  center: [-122.333592, 47.605628],
  mediaType: 'mobile',
  viewingDirections: false,
  zoom: 15,
};

const mapStateToProps = state => ({
  center: [state.view.lng, state.view.lat],
  mediaType: state.browser.mediaType,
  viewingDirections: state.activities.viewingDirections,
  zoom: state.view.zoom,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessMap);
