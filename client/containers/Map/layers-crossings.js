import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';


const CROSSINGS_VISIBLE = 15;

const widthExpression = [
  'interpolate',
  ['linear'],
  ['zoom'],
  10, 1,
  15, 1,
  22, 20,
];

const widthExpressionOutline = [
  'interpolate',
  ['linear'],
  ['zoom'],
  10, 0.7,
  15, 0.7,
  22, 10,
];


const Crossings = () => (
  <React.Fragment>
    <Layer
      id='crossing-click'
      type='line'
      sourceId='paths'
      sourceLayer='crossings'
      paint={{
        'line-width': {
          stops: [[12, 0.5], [16, 2], [22, 20]],
        },
        'line-opacity': 0,
      }}

      before='bridge-street'
    />
    <Layer
      id='crossing-unmarked'
      type='line'
      sourceId='paths'
      sourceLayer='crossings'
      filter={[
        '==',
        ['string', ['get', 'crossing']],
        'unmarked',
      ]}
      paint={{
        'line-color': '#555',
        'line-gap-width': widthExpression,
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          CROSSINGS_VISIBLE - 0.5, 0.0,
          CROSSINGS_VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />
    <Layer
      id='crossing-unknown'
      type='line'
      sourceId='paths'
      sourceLayer='crossings'
      filter={[
        '==',
        ['typeof', ['get', 'crossing']],
        'null',
      ]}
      paint={{
        'line-color': '#555',
        'line-gap-width': widthExpression,
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          CROSSINGS_VISIBLE - 0.5, 0.0,
          CROSSINGS_VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />
    <Layer
      id='crossing-marked'
      type='line'
      sourceId='paths'
      sourceLayer='crossings'
      layout={{ 'line-cap': 'round' }}
      filter={[
        'any',
        [
          '==',
          ['string', ['get', 'crossing']],
          'uncontrolled',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'zebra',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'uncontrolled;zebra',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'zebra;uncontrolled',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'traffic_signals',
        ],
      ]}
      paint={{
        'line-color': '#555',
        'line-width': widthExpression,
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          CROSSINGS_VISIBLE - 0.5, 0.0,
          CROSSINGS_VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />
    <Layer
      id='crossing-marked-white-outline'
      type='line'
      sourceId='paths'
      sourceLayer='crossings'
      layout={{ 'line-cap': 'round' }}
      filter={[
        'any',
        [
          '==',
          ['string', ['get', 'crossing']],
          'uncontrolled',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'zebra',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'uncontrolled;zebra',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'zebra;uncontrolled',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'traffic_signals',
        ],
      ]}
      paint={{
        'line-color': '#fff',
        'line-gap-width': widthExpressionOutline,
        'line-width': { stops: [[12, 0.2], [16, 0.6], [22, 6]] },
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          CROSSINGS_VISIBLE - 0.5, 0.0,
          CROSSINGS_VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />
    <Layer
      id='crossing-marked-outline'
      type='line'
      sourceId='paths'
      sourceLayer='crossings'
      layout={{ 'line-cap': 'round' }}
      filter={[
        'any',
        [
          '==',
          ['string', ['get', 'crossing']],
          'uncontrolled',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'zebra',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'uncontrolled;zebra',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'zebra;uncontrolled',
        ],
        [
          '==',
          ['string', ['get', 'crossing']],
          'traffic_signals',
        ],
      ]}
      paint={{
        'line-color': '#000',
        'line-gap-width': widthExpression,
        'line-width': { stops: [[14, 0.00], [20, 1]] },
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          CROSSINGS_VISIBLE - 0.5, 0.0,
          CROSSINGS_VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />

  </React.Fragment>
);

Crossings.propTypes = {
  requireCurbRamps: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    profile,
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    requireCurbRamps: currentProfile.requireCurbRamps,
  };
};

export default connect(
  mapStateToProps,
)(Crossings);
