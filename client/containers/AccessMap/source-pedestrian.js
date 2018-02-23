import path from 'path';
import React from 'react';

import { Source } from 'react-mapbox-gl';


const PED_SOURCE = {
  type: 'vector',
  tiles: [path.join(
    window.location.origin,
    '/tiles/pedestrian/{z}/{x}/{y}.pbf'
  )],
  maxzoom: 17,
  attribution: '&copy; AccessMap'
};


const PedestrianSource = () => {
  // This has to get set as a constant before render, otherwise all the layers
  // using this source have to reload on every render (flickers).
  return (
    <Source
      id='pedestrian'
      tileJsonSource={PED_SOURCE}
    />
  );
}


export default PedestrianSource;
