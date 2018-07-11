import React from 'react';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';

const RADIUS_FUNCTION = {
  stops: [
    [12, 3],
    [22, 24],
  ],
  base: 2,
};

const Elevators = () => (
  <React.Fragment>
    <Layer
      id='elevators'
      type='circle'
      sourceId='elevators'
      sourceLayer='elevators-49mqjn'
      paint={{
        'circle-radius': RADIUS_FUNCTION,
        'circle-color': 'blue',
        'circle-stroke-color': 'black',
        'circle-stroke-width': 1,
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
