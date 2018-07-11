import React from 'react';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';

const RADIUS_FUNCTION = {
  stops: [
    [12, 2],
    [22, 20],
  ],
  base: 2,
};

const Elevators = () => (
  <React.Fragment>
    <Layer
      id='kerbs'
      type='circle'
      sourceId='kerbs'
      sourceLayer='kerbs-dek2u2'
      paint={{
        'circle-radius': RADIUS_FUNCTION,
        'circle-color': [
          'case',
          [
            '==',
            ['string', ['get', 'kerb']],
            'lowered',
          ],
          'white',
          'black',
        ],
        'circle-stroke-color': 'black',
        'circle-stroke-width': {
          stops: [[15, 0.5], [20, 2]],
          base: 2,
        },
        'circle-opacity': 1,
      }}
      before='bridge-street'
    />
  </React.Fragment>
);

const mapStateToProps = () => ({
});

export default connect(
  mapStateToProps,
)(Elevators);
