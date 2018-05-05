import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';

import { SIDEWALK_FLAT, SIDEWALK_MID, SIDEWALK_STEEP } from 'constants/colors';
import { inclineFromSpeed } from 'profiles/cost-function';

// TODO: put the code for this icon in its own module
/* eslint-disable import/no-webpack-loader-syntax */
import directionArrowURL from '!file-loader!images/direction-arrow.png';
import directionArrowWhiteURL from '!file-loader!images/direction-arrow-white.png';
/* eslint-enable import/no-webpack-loader-syntax */

const EARTH_RADIUS = 6378137;
const LAT = 47.6;
const TILESIZE = 512;

const pixelsPerMeter = (zoom) => {
  const scale = 2 ** zoom;
  const worldSize = TILESIZE * scale;
  const rest = 2 * Math.PI * EARTH_RADIUS * Math.abs(Math.cos(LAT * (Math.PI / 180)));
  return worldSize / rest;
};

const setWidthAtZoom = (width, zoom) => d => width * (2 ** (d - (zoom - 1)));

const wayWidthExpression = [
  'interpolate',
  ['linear'],
  ['zoom'],
].concat([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((d) => {
  if (d < 17) return [d, setWidthAtZoom(3, 16)(d)];
  return [d, ['*', pixelsPerMeter(d), ['get', 'width']]];
}).reduce((a, d) => a.concat(d)));

const directionArrow = new Image();
directionArrow.src = directionArrowURL;
directionArrow.height = 48;
directionArrow.width = 24;

const directionArrowWhite = new Image();
directionArrowWhite.src = directionArrowWhiteURL;
directionArrowWhite.height = 48;
directionArrowWhite.width = 24;

const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [
  WIDTH_INACCESSIBLE * 4,
  WIDTH_INACCESSIBLE * 1.5,
];

const INCLINE_IDEAL = -0.0087;

const Sidewalks = (props) => {
  const {
    inclineMax,
    inclineMin,
    speed,
    inclineUphill,
  } = props;

  const inclineDownMid = inclineFromSpeed(speed / 2, inclineMax, inclineMin, speed, false);
  const inclineUpMid = inclineFromSpeed(speed / 2, inclineMax, inclineMin, speed, true);

  let inclineStops;
  if (inclineUphill) {
    inclineStops = [
      1000 * -inclineMax, SIDEWALK_STEEP,
      1000 * -inclineUpMid, SIDEWALK_MID,
      0, SIDEWALK_FLAT,
      1000 * inclineUpMid, SIDEWALK_MID,
      1000 * inclineMax, SIDEWALK_STEEP,
    ];
  } else {
    inclineStops = [
      1000 * inclineMin, SIDEWALK_STEEP,
      1000 * inclineDownMid, SIDEWALK_MID,
      1000 * INCLINE_IDEAL, SIDEWALK_FLAT,
      1000 * -INCLINE_IDEAL, SIDEWALK_FLAT,
      1000 * -inclineDownMid, SIDEWALK_MID,
      1000 * -inclineMin, SIDEWALK_STEEP,
    ];
  }

  // Set bounds for when elevations become 'too steep' on display.
  const boundMax = inclineUphill ? 1000 * inclineMax : 1000 * -inclineMin;
  const boundMin = inclineUphill ? 1000 * -inclineMax : 1000 * inclineMin;

  return (
    <React.Fragment>
      <Layer
        id='sidewalk-click'
        type='line'
        sourceId='pedestrian'
        sourceLayer='sidewalks'
        paint={{
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]],
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
          [
            '>',
            ['to-number', ['get', 'incline']],
            boundMax,
          ],
          false,
          [
            '<',
            ['to-number', ['get', 'incline']],
            boundMin,
          ],
          false,
          true,
        ]}
        paint={{
          'line-color': '#000',
          'line-width': {
            stops: [[14, 0.00], [20, 1]],
          },
          'line-opacity': {
            stops: [[13.5, 0.0], [16, 1]],
          },
          'line-gap-width': wayWidthExpression,
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
          [
            '>',
            ['to-number', ['get', 'incline']],
            boundMax,
          ],
          true,
          [
            '<',
            ['to-number', ['get', 'incline']],
            boundMin,
          ],
          true,
          false,
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
          'line-width': [
            'interpolate', ['linear'], ['zoom'],
            12, WIDTH_INACCESSIBLE / 4,
            16, WIDTH_INACCESSIBLE,
            20, WIDTH_INACCESSIBLE * 4,
          ],
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
          [
            '>',
            ['to-number', ['get', 'incline']],
            boundMax,
          ],
          false,
          [
            '<',
            ['to-number', ['get', 'incline']],
            boundMin,
          ],
          false,
          true,
        ]}
        paint={{
          'line-color': [
            'case',
            [
              '>',
              ['to-number', ['get', 'incline']],
              boundMax,
            ],
            '#ff0000',
            [
              '<',
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
          'line-width': wayWidthExpression,
        }}
        before='bridge-street'
      />
      <Layer
        id='sidewalk-downhill-arrow'
        type='symbol'
        sourceId='pedestrian'
        sourceLayer='sidewalks'
        minZoom={16}
        images={[[
          'direction-arrow', directionArrow,
        ], [
          'direction-arrow-white', directionArrowWhite,
        ]]}
        filter={[
          'case',
          [
            '>',
            ['to-number', ['get', 'incline']],
            boundMax,
          ],
          false,
          [
            '<',
            ['to-number', ['get', 'incline']],
            boundMin,
          ],
          false,
          true,
        ]}
        layout={{
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-image': [
            'case',
            [
              '>',
              [
                'case',
                [
                  '<',
                  ['to-number', ['get', 'incline']],
                  0,
                ],
                ['*', -1, ['to-number', ['get', 'incline']]],
                ['to-number', ['get', 'incline']],
              ],
              Math.abs((inclineStops[0] + inclineStops[2]) / 2),
            ],
            'direction-arrow-white',
            'direction-arrow',
          ],
          'icon-rotate': [
            'case',
            [
              '>=',
              ['to-number', ['get', 'incline']],
              0,
            ],
            270,
            90,
          ],
          'icon-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            16, 0.1,
            18, 0.3,
            20, 0.4,
          ],
          'symbol-placement': 'line',
          'icon-padding': 0,
          'symbol-spacing': [
            'interpolate',
            ['linear'],
            ['zoom'],
            16, 50,
            20, 200,
          ],
        }}
        paint={{
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            16, 0.0,
            16.25, 0.9,
          ],
        }}
        before='bridge-street'
      />

    </React.Fragment>
  );
};

Sidewalks.propTypes = {
  inclineMax: PropTypes.number.isRequired,
  inclineMin: PropTypes.number.isRequired,
  inclineUphill: PropTypes.bool,
  speed: PropTypes.number.isRequired,
};

Sidewalks.defaultProps = {
  inclineUphill: true,
};

const mapStateToProps = (state) => {
  const {
    map,
    profile,
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    inclineMax: currentProfile.inclineMax,
    inclineMin: currentProfile.inclineMin,
    speed: currentProfile.speed,
    inclineUphill: map.inclineUphill,
  };
};

export default connect(
  mapStateToProps,
)(Sidewalks);
