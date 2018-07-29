import React from 'react';

import { Source } from 'react-mapbox-gl';

const protocol = process.env.HOST ? 'https://' : 'http://';
const host = process.env.HOST || 'localhost:2015';

const Sources = () => (
  <React.Fragment>
    <Source
      id='pedestrian'
      tileJsonSource={{
        type: 'vector',
        url: `${protocol}${host}/tiles/tilejson/pedestrian.json`,
      }}
    />
  </React.Fragment>
);

export default Sources;
