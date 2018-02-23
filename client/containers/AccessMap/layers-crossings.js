import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';


const CROSSINGS_VISIBLE = 15;
const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [
  WIDTH_INACCESSIBLE * 2,
  WIDTH_INACCESSIBLE * 1.5,
];


const Crossings = (props) => {
  const { requireCurbRamps } = props;

  return (
    <React.Fragment>
      <Layer
        id='crossing-click'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        paint={{
          'line-width': {
            stops: [[12, 0.5], [16, 2], [22, 20]]
          },
          'line-opacity': 0
        }}

        before='bridge-street'
      />
      <Layer
        id='crossing-inaccessible'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        filter={[
          'all',
          requireCurbRamps,
          ['!',
            ['to-boolean',
              ['get', 'curbramps']
            ]
          ]
        ]}
        paint={{
          'line-color': '#ff0000',
          'line-dasharray': {
            stops: [
              [12, [DASH_INACCESSIBLE[0] * 2, DASH_INACCESSIBLE[1] * 4]],
              [14, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 2]],
              [16, [DASH_INACCESSIBLE[0], DASH_INACCESSIBLE[1] * 1.5]],
            ],
          },
          'line-width': {
            stops: [
              [12, WIDTH_INACCESSIBLE / 4],
              [16, WIDTH_INACCESSIBLE],
              [20, WIDTH_INACCESSIBLE * 4]
            ]
          },
          'line-opacity': ['interpolate', ['linear'], ['zoom'],
             CROSSINGS_VISIBLE - 0.5, 0.0,
             CROSSINGS_VISIBLE, 1
          ],
        }}
        before='bridge-street'
      />
      <Layer
        id='crossing'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        layout={{ 'line-cap': 'round' }}
        filter={[
          'any',
          !requireCurbRamps,
          ['to-boolean',
            ['get', 'curbramps']
          ]
        ]}
        paint={{
          'line-color': '#000000',
          'line-width': {
            stops: [[12, 0.5], [16, 2], [22, 20]]
          },
          'line-opacity': ['interpolate', ['linear'], ['zoom'],
             CROSSINGS_VISIBLE - 0.5, 0.0,
             CROSSINGS_VISIBLE, 0.5
          ]
        }}
        before='bridge-street'
      />
      <Layer
        id='crossing-outline'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        layout={{ 'line-cap': 'round' }}
        filter={[
          'to-boolean',
          ['get', 'curbramps']
        ]}
        paint={{
          'line-color': '#555555',
          'line-width': {
            stops: [[12, 0.1], [15, 0.35], [22, 1]]
          },
          'line-gap-width': { stops: [[12, 0.5], [16, 2], [22, 20]] },
          'line-opacity': ['interpolate', ['linear'], ['zoom'],
             CROSSINGS_VISIBLE - 0.5, 0.0,
             CROSSINGS_VISIBLE, 0.5
          ],
        }}
        before='bridge-street'
      />
    </React.Fragment>
  );
}

Crossings.propTypes = {
  requireCurbRamps: PropTypes.bool,
};

function mapStateToProps(state) {
  const {
    routingprofile
  } = state;

  return {
    requireCurbRamps: routingprofile.requireCurbRamps,
  };
}


export default connect(
  mapStateToProps,
)(Crossings);
