import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';

import { SIDEWALK_FLAT, SIDEWALK_MID, SIDEWALK_STEEP } from 'constants/colors';
import { inclineFromSpeed } from 'profiles/cost-function';


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
          'line-gap-width': {
            stops: [[12, 0.5], [16, 3], [22, 30]],
          },
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
          'line-width': {
            stops: [
              [12, WIDTH_INACCESSIBLE / 4],
              [16, WIDTH_INACCESSIBLE],
              [20, WIDTH_INACCESSIBLE * 4],
            ],
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
          'line-width': {
            stops: [[12, 0.2], [16, 3], [22, 30]],
          },
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
