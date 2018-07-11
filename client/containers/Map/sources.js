import React from 'react';

import { Source } from 'react-mapbox-gl';

const Sources = () => (
  <React.Fragment>
    <Source
      id='paths'
      tileJsonSource={{
        type: 'vector',
        url: 'http://localhost:2015/tiles/tilejson/paths.json',
      }}
    />
    <Source
      id='points'
      tileJsonSource={{
        type: 'vector',
        url: 'http://localhost:2015/tiles/tilejson/points.json',
      }}
    />
  </React.Fragment>
);

export default Sources;
