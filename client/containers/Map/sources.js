import React from 'react';

import { Source } from 'react-mapbox-gl';

const Sources = () =>
  <React.Fragment>
    <Source
      id='crossings'
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://accessmap.3qpntf2g',
      }}
    />
    <Source
      id='sidewalks'
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://accessmap.aii7dtpk',
      }}
    />
    <Source
      id='footways'
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://accessmap.ctv6lc9a',
      }}
    />
    <Source
      id='stairs'
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://accessmap.4nm23ibk',
      }}
    />
    <Source
      id='elevators'
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://accessmap.51ktwqv5',
      }}
    />
    <Source
      id='kerbs'
      tileJsonSource={{
        type: 'vector',
        url: 'mapbox://accessmap.8oollirk',
      }}
    />
  </React.Fragment>;


export default Sources;
