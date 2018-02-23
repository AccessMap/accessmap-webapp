import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';
import chroma from 'chroma-js';


const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [
  2,
  1.5,
];
const INCLINE_IDEAL = -0.0087
const COLORS = [chroma('lime'), chroma('yellow'), chroma('red')]
  .map(color => color.brighten(1.5));
const COLOR_SCALE = chroma.scale(COLORS).mode('lab');


const Sidewalks = (props) => {
  const {
    inclineMax,
    inclineMin,
    mode,
  } = props;

  // Set bounds for when elevations become 'too steep' on display.
  const boundMax = mode === 'DOWNHILL' ? 1000 * -inclineMin : 1000 * inclineMax;
  const boundMin = mode === 'DOWNHILL' ? 1000 * inclineMin : 1000 * -inclineMax;

  const maxUp = Math.max(inclineMax, Math.abs(INCLINE_IDEAL) * 2);
  const maxDown = Math.min(inclineMin, INCLINE_IDEAL);

  let inclineStops;
  // midColor is the distance between the color signifying 'most difficult'
  // and the color signifying 'medium difficulty' on our scale
  const midColor = 0.5;

  const midDown = (maxDown + INCLINE_IDEAL) / 2;
  const midUp = (maxUp + INCLINE_IDEAL) / 2;
  if (mode === 'DOWNHILL') {
    // Find the incline=0 intercept (find cost at that point). Linear func.
    const dx = midDown - INCLINE_IDEAL;
    const m = midColor / dx;
    const b = INCLINE_IDEAL - (m * midDown);

    inclineStops = [
      1000 * maxDown, COLOR_SCALE(1).hex(),
      1000 * midDown, COLOR_SCALE(midColor).hex(),
      1000 * INCLINE_IDEAL, COLOR_SCALE(0).hex(),
      0, COLOR_SCALE(b).hex(),
      1000 * -INCLINE_IDEAL, COLOR_SCALE(0).hex(),
      1000 * -midDown, COLOR_SCALE(midColor).hex(),
      1000 * -maxDown, COLOR_SCALE(1).hex()
    ];
  } else {
    // Find the incline=0 intercept (find cost at that point). Linear func.
    const dx = midUp - INCLINE_IDEAL;
    const m = midColor / dx;
    const b = INCLINE_IDEAL - (m * midUp);

    inclineStops = [
      1000 * -maxUp, COLOR_SCALE(1).hex(),
      1000 * -midUp, COLOR_SCALE(midColor).hex(),
      0, COLOR_SCALE(b).hex(),
      1000 * midUp, COLOR_SCALE(midColor).hex(),
      1000 * maxUp, COLOR_SCALE(1).hex()
    ];
  }

  return (
    <React.Fragment>
      <Layer
        id='sidewalk-click'
        type='line'
        sourceId='pedestrian'
        sourceLayer='sidewalks'
        paint={{
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]]
          },
          'line-opacity': 0,
        }}
        before='bridge-street'
      />
      <Layer
        id='sidewalk-outline'
        type='line'
        sourceId='pedestrian'
        sourceLayer='sidewalks'
        layout={{ 'line-cap': 'round' }}
        filter={[
          'case',
           ['>',
            ['to-number', ['get', 'incline']],
            boundMax,
           ],
           false,
           ['<',
            ['to-number', ['get', 'incline']],
            boundMin,
           ],
           false,
           true
        ]}
        paint={{
          'line-color': '#555555',
          'line-width': {
            stops: [[14, 0.01], [22, 1]]
          },
          'line-opacity': {
            stops: [[13.5, 0.0], [14, 1]]
          },
          'line-gap-width': {
            stops: [[12, 0.5], [16, 3], [22, 30]]
          }
        }}
        before='bridge-street'
      />
      <Layer
        id='sidewalk-inaccessible'
        type='line'
        sourceId='pedestrian'
        sourceLayer='sidewalks'
        filter={[
          'case',
           ['>',
            ['to-number', ['get', 'incline']],
            boundMax,
           ],
           true,
           ['<',
            ['to-number', ['get', 'incline']],
            boundMin,
           ],
           true,
           false
        ]}
        paint={{
          'line-color': '#ff0000',
          'line-dasharray': {
            stops: [
              [10, DASH_INACCESSIBLE.map(d => WIDTH_INACCESSIBLE * d * 2)],
              [15, DASH_INACCESSIBLE.map(d => WIDTH_INACCESSIBLE * d * 1.5)],
              [20, DASH_INACCESSIBLE.map(d => WIDTH_INACCESSIBLE * d)],
            ],
          },
          'line-width': {
            stops: [
              [12, WIDTH_INACCESSIBLE / 4],
              [16, WIDTH_INACCESSIBLE],
              [20, WIDTH_INACCESSIBLE * 4]
            ]
          },
        }}
        before='bridge-street'
      />
      <Layer
        id='sidewalk'
        type='line'
        sourceId='pedestrian'
        sourceLayer='sidewalks'
        layout={{ 'line-cap': 'round' }}
        filter={[
          'case',
           ['>',
            ['to-number', ['get', 'incline']],
            boundMax,
           ],
           false,
           ['<',
            ['to-number', ['get', 'incline']],
            boundMin,
           ],
           false,
           true
        ]}
        paint={{
          'line-color': [
            'case',
             ['>',
              ['to-number', ['get', 'incline']],
              boundMax,
             ],
             '#ff0000',
             ['<',
              ['to-number', ['get', 'incline']],
              boundMin,
             ],
             '#ff0000',
             [
               'interpolate',
               ['linear'],
               ['to-number', ['get', 'incline']],
               ...inclineStops,
             ],
          ],
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]]
          },
        }}
        before='bridge-street'
      />
    </React.Fragment>
  );
}

Sidewalks.propTypes = {
  inclineMax: PropTypes.number,
  inclineMin: PropTypes.number,
  mode: PropTypes.oneOf(['UPHILL', 'DOWNHILL', 'OTHER']),
};


function mapStateToProps(state) {
  const {
    mode,
    routingprofile,
  } = state;

  return {
    inclineMax: routingprofile.inclineMax,
    inclineMin: routingprofile.inclineMin,
    mode: mode,
  };
}


export default connect(
  mapStateToProps,
)(Sidewalks);
