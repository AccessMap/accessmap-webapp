import React from 'react';
import PropTypes from 'prop-types';

import { Layer } from 'react-mapbox-gl';


const VISIBLE = 15;


const ElevatorPaths = () => (
  <React.Fragment>
    <Layer
      id='elevator-paths-click'
      type='line'
      sourceId='pedestrian'
      sourceLayer='elevator_paths'
      paint={{
        'line-width': {
          stops: [[12, 0.3], [16, 2], [22, 20]],
        },
        'line-opacity': 0,
      }}
      before='bridge-street'
    />
    <Layer
      id='elevator-paths'
      type='line'
      sourceId='pedestrian'
      sourceLayer='elevator_paths'
      paint={{
        'line-color': '#000',
        'line-gap-width': {
          stops: [[12, 0.3], [16, 2], [22, 20]],
        },
        'line-width': {
          stops: [[12, 0.1], [16, 0.6], [22, 6]],
        },
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          VISIBLE - 0.5, 0.0,
          VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />
  </React.Fragment>
);

export default ElevatorPaths;
