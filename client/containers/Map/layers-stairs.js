import React from 'react';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';


const VISIBLE = 13;


const Stairs = () => (
  <React.Fragment>
    <Layer
      id='stairs-click'
      type='line'
      sourceId='stairs'
      sourceLayer='stairs-adwbrt'
      paint={{
        'line-width': {
          stops: [[12, 0.5], [16, 2], [22, 20]],
        },
        'line-opacity': 0,
      }}

      before='bridge-street'
    />
    <Layer
      id='stairs'
      type='line'
      sourceId='stairs'
      sourceLayer='stairs-adwbrt'
      paint={{
        'line-color': '#555',
        'line-width': {
          stops: [[12, 0.5], [16, 2], [22, 20]],
        },
        'line-dasharray': [0.2, 0.2],
        'line-opacity': ['interpolate', ['linear'], ['zoom'],
          VISIBLE - 0.5, 0.0,
          VISIBLE, 1,
        ],
      }}
      before='bridge-street'
    />
  </React.Fragment>
);

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
)(Stairs);
