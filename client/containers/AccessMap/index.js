import path from 'path';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ReactMapboxGl, { GeoJSONLayer, Layer, Source } from 'react-mapbox-gl';
import chroma from 'chroma-js';

import MapMarker from 'components/MapMarker';
import { routeResult as routeResultProps } from 'prop-schema';

import * as AppActions from 'actions';

const CLICKABLE_LAYERS = ['sidewalk', 'crossing-ramps', 'crossing-noramps'];

const colors = [chroma('lime'), chroma('yellow'), chroma('red')]
  .map(color => color.brighten(1.5));
const colorScale = chroma.scale(colors).mode('lab');

const PEDESTRIAN_SOURCE = {
  type: 'vector',
  tiles: [path.join(
    window.location.origin,
    '/tiles/pedestrian/{z}/{x}/{y}.pbf'
  )],
  maxzoom: 17,
  attribution: '&copy; AccessMap'
};

const Map = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN,
  bearing: [0],
  pitch: [0]
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
    if (this.state.width != width | this.state.height != height) {
      this.setState({
        width,
        height,
      });
      this.props.actions.resizeMap(width, height);
    }
  }

  render() {
    const {
      actions,
      inclineMax,
      inclineMin,
      inclineIdeal,
      requireCurbRamps,
      routeResult,
      origin,
      destination,
      poi,
      planningTrip,
      geolocation,
      center,
      zoom,
      mode,
      ...props
    } = this.props;

    let crossingOpacity;
    if (requireCurbRamps) {
      crossingOpacity = [[13, 0.0], [15, 0.1], [22, 0.2]];
    } else {
      crossingOpacity = [[13, 0.0], [15, 0.4], [22, 0.5]];
    }

    // FIXME: this should be constrained by the slider or caught in proptypes
    // Restrict values of extreme inclines such that control points on the x
    // axis are monotonically increasing. Since the 'mid' controls are generated
    // as half-way between the ideal and each extreme, we are constraining the
    // 'mids' to be greater than 0 and on the correct side of 'ideal'. We
    // will assume that ideal is always negative, so this becomes:
    // max up > (abs(ideal) * 2)
    // max down < ideal
    const maxUp = Math.max(inclineMax, Math.abs(inclineIdeal) * 2);
    const maxDown = Math.min(inclineMin, inclineIdeal);

    let inclineStops;

    // midColor is the distance between the color signifying 'most difficult'
    // and the color signifying 'medium difficulty' on our scale
    const midColor = 0.5;

    const midDown = (maxDown + inclineIdeal) / 2;
    const midUp = (maxUp + inclineIdeal) / 2;
    if (mode === 'DOWNHILL') {
      // Find the incline=0 intercept (find cost at that point). Linear func.
      const dx = midDown - inclineIdeal;
      const m = midColor / dx;
      const b = inclineIdeal - (m * midDown);

      inclineStops = [
        maxDown, colorScale(1).hex(),
        midDown, colorScale(midColor).hex(),
        inclineIdeal, colorScale(0).hex(),
        0, colorScale(b).hex(),
        -inclineIdeal, colorScale(0).hex(),
        -midDown, colorScale(midColor).hex(),
        -maxDown, colorScale(1).hex()
      ];
    } else {
      // Find the incline=0 intercept (find cost at that point). Linear func.
      const dx = midUp - inclineIdeal;
      const m = midColor / dx;
      const b = inclineIdeal - (m * midUp);

      inclineStops = [
        -maxUp, colorScale(1).hex(),
        -midUp, colorScale(midColor).hex(),
        0, colorScale(b).hex(),
        midUp, colorScale(midColor).hex(),
        maxUp, colorScale(1).hex()
      ];
    }

    // Handle markers
    // - If origin and destination are set, render those. Otherwise, render
    // POI if available
    let waypoints;
    if (origin || destination) {
      waypoints = [origin, destination];
    } else {
      waypoints = [poi];
    }
    const markers = waypoints.filter(d => d).map(d =>
      <MapMarker
        coordinates={d.geometry.coordinates}
        key={`waypoint-${d.geometry.coordinates}`}
      />
    );

    // The little bits of route from the origin point to the routing graph
    // (e.g. space needle -> closest pedestrian path)
    let routeJogsLine;
    let routeLine;
    let routeLineCasing;

    if (planningTrip && routeResult) {
      const routeJogs = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                routeResult.origin.geometry.coordinates,
                routeResult.routes[0].geometry.coordinates[0]
              ]
            },
            properties: {
              waypoint: 'origin'
            }
          }, {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                routeResult.routes[0].geometry.coordinates.slice(-1)[0],
                routeResult.destination.geometry.coordinates
              ]
            },
            properties: {
              waypoint: 'destination'
            }
          },

        ]
      };

      // The proper route path (data only)
      const routePath = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: routeResult.routes[0].geometry,
          properties: {}
        }]
      };

      routeJogsLine = (
        <GeoJSONLayer
          data={routeJogs}
          lineLayout={{ 'line-cap': 'round' }}
          linePaint={{
            'line-color': 'black',
            'line-opacity': 0.6,
            'line-width': {
              stops: [[12, 0.2], [16, 3], [22, 30]]
            },
            'line-dasharray': {
              stops: [
                [12, [0, 1]],
                [15, [0, 1.5]],
                [20, [0, 4]]
              ]
            }
          }}
          before={'bridge-path-bg'}
        />
      );

      // The proper route path layer - drawing via MapboxGL component
      routeLine = (
        <GeoJSONLayer
          data={routePath}
          lineLayout={{
            'line-cap': 'round',
            'line-join': 'round'
          }}
          linePaint={{
            'line-color': '#4bf',
            'line-width': {
              stops: [[12, 4.7], [16, 9.7], [22, 92]]
            },
          }}
          before={'crossing-noramps'}
        />
      );

      routeLineCasing = (
        <GeoJSONLayer
          data={routePath}
          lineLayout={{
            'line-cap': 'round',
            'line-join': 'round'
          }}
          linePaint={{
            'line-color': 'black',
            'line-gap-width': {
              stops: [[12, 4.7], [16, 9.7], [22, 92]]
            },
            'line-width': {
              stops: [[12, 0.5], [16, 1], [22, 1]]
            }
          }}
          before={'crossing-noramps'}
        />
      );

    }

    const geolocationFc = {
      type: 'FeatureCollection',
      features: []
    };
    let geolocationRadius = 0;

    if (geolocation && geolocation.status === 'Ok') {
      geolocationFc.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: geolocation.coordinates
        },
        properties: {}
      });
      geolocationRadius = (
        geolocation.accuracy /
        0.075 /
        Math.cos(
          (geolocation.coordinates[1] *
           Math.PI) /
          180
        )
      );
    }

    // NOTE: Do not create actions that modify the `view` substate via
    // onMoveEnd or onZoomEnd. If you do, it creates an infinite loop.
    return (
      <Map
        ref={(el) => { this.mapEl = el; }}
        center={center}
        zoom={[zoom]}
        bearing={[0]}
        pitch={[0]}
        /* eslint-disable react/style-prop-object */
        style='mapbox://styles/mapbox/streets-v8'
        /* eslint-enable react/style-prop-object */
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
        onMouseDown={(m, e) => {
          // NOTE: We can't use the 'contextmenu' event, because of
          // inconsistent behavior between devices and browsers. Specifically,
          // iOS safari doesn't create 'contextmenu' events, so to prevent
          // double-firing on all other browsers, we just check for 'right
          // click' on desktop and manually manage a long press using touch
          // events.
          if (e.originalEvent.button === 2) {
            // Right click!
            const { lng, lat } = e.lngLat;
            actions.mapContextClick(lng, lat);
          }
        }}
        onContextMenu={(m, e) => {
          // Ignore the context menu event
          e.preventDefault();
        }}
        onTouchStart={(m, e) => {
          const { lng, lat } = e.lngLat;
          clearTimeout(this.longPressTrigger);
          this.longPressTrigger = setTimeout(() => {
            actions.mapContextClick(lng, lat);
          }, 500);
        }}
        onTouchMove={() => clearTimeout(this.longPressTrigger)}
        onTouchEnd={(m, e) => {
          clearTimeout(this.longPressTrigger);
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

        {...props}
      >

        <Source id='pedestrian' tileJsonSource={PEDESTRIAN_SOURCE} />

        <Layer
          id='crossing-noramps'
          type='line'
          sourceId='pedestrian'
          sourceLayer='crossings'
          filter={['!', ['to-boolean', ['get', 'curbramps']]]}
          layout={{ 'line-cap': 'round' }}
          paint={{
            'line-color': '#000000',
            'line-width': {
              stops: [[12, 0.5], [16, 2], [22, 20]]
            },
            'line-opacity': {
              stops: crossingOpacity
            }
          }}
          before='bridge-path-bg'
        />

        <Layer
          id='crossing-ramps'
          type='line'
          sourceId='pedestrian'
          sourceLayer='crossings'
          filter={['to-boolean', ['get', 'curbramps']]}
          layout={{ 'line-cap': 'round' }}
          paint={{
            'line-color': '#000000',
            'line-width': {
              stops: [[12, 0.5], [16, 2], [22, 20]]
            },
            'line-opacity': {
              stops: [[13, 0.0], [15, 0.4], [22, 0.5]]
            }
          }}
          before='bridge-path-bg'
        />

        <Layer
          id='sidewalk-outline'
          type='line'
          sourceId='pedestrian'
          sourceLayer='sidewalks'
          layout={{ 'line-cap': 'round' }}
          paint={{
            'line-color': '#000000',
            'line-width': {
              stops: [[12, 0.1], [15, 0.35], [22, 1]]
            },
            'line-opacity': {
              stops: [[10, 0.0], [15, 0.9], [22, 1]]
            },
            'line-gap-width': {
              stops: [[12, 0.5], [16, 3], [22, 30]]
            }
          }}
          before='bridge-path-bg'
        />

        <Layer
          id='sidewalk'
          type='line'
          sourceId='pedestrian'
          sourceLayer='sidewalks'
          layout={{ 'line-cap': 'round' }}
          paint={{
            'line-color': [
              'interpolate',
              ['linear'],
              ['to-number', ['get', 'incline']],
              ...inclineStops
            ],
            'line-width': {
              stops: [[12, 0.2], [16, 3], [22, 30]]
            },
            'line-opacity': {
              stops: [[8, 0.0], [12, 0.8], [15, 1], [22, 1]]
            }
          }}
          before='bridge-path-bg'
        />
        {routeJogsLine}
        {routeLine}
        {routeLineCasing}
        {markers}

        <GeoJSONLayer
          data={geolocationFc}
          id='geolocation-outline'
          key='geolocation-outline'
          circlePaint={{
            'circle-radius': {
              stops: [
                [0, 0],
                [20, geolocationRadius]
              ],
              base: 2
            },
            'circle-color': '#007cbf',
            'circle-opacity': 0.2
          }}
        />
        <GeoJSONLayer
          data={geolocationFc}
          id='geolocation'
          key='geolocation'
          circlePaint={{
            'circle-radius': 8,
            'circle-color': '#007cbf',
            'circle-opacity': 0.8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }}
        />
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
  inclineMax: PropTypes.number,
  inclineMin: PropTypes.number,
  inclineIdeal: PropTypes.number,
  requireCurbRamps: PropTypes.bool,
  mode: PropTypes.oneOf(['UPHILL', 'DOWNHILL', 'OTHER']),
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
  poi: PropTypes.shape({
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
  geolocation: PropTypes.shape({
    coordinates: PropTypes.arrayOf(PropTypes.number),
    accuracy: PropTypes.number,
    status: PropTypes.oneOf(['Ok', 'none', 'unavailable'])
  }),
  routeResult: routeResultProps,
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
};

AccessMap.defaultProps = {
  inclineMax: 0.1,
  inclineMin: -0.08,
  inclineIdeal: -0.01,
  requireCurbRamps: true,
  mode: 'uphill',
  origin: null,
  destination: null,
  poi: null,
  planningTrip: false,
  geolocation: { coordinates: null, accuracy: null, status: 'none' },
  routeResult: null,
  center: [-122.333592, 47.605628],
  zoom: 15,
};

function mapStateToProps(state) {
  const {
    activities,
    geolocation,
    mode,
    routingprofile,
    tripplanning,
    view,
    waypoints,
  } = state;

  return {
    destination: waypoints.destination,
    center: [view.lng, view.lat],
    geolocation,
    inclineMax: routingprofile.inclineMax,
    inclineMin: routingprofile.inclineMin,
    inclineIdeal: routingprofile.inclineIdeal,
    mode: mode,
    origin: waypoints.origin,
    planningTrip: activities.planningTrip,
    poi: waypoints.poi,
    requireCurbRamps: routingprofile.requireCurbRamps,
    routeResult: tripplanning.routeResult,
    zoom: view.zoom,
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
)(AccessMap);
