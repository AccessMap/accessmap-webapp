import React from 'react';

import { Source } from 'react-mapbox-gl';

const Sources = () => (
  <React.Fragment>
    <Source
      id='pedestrian'
      tileJsonSource={{
        type: 'vector',
        url: '/tiles/tilejson/pedestrian.json',
      }}
    />
  </React.Fragment>
);

export default Sources;
