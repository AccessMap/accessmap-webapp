import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Layer } from 'react-mapbox-gl';


const CROSSINGS_VISIBLE = 15;
const WIDTH_INACCESSIBLE = 1;
const DASH_INACCESSIBLE = [
  WIDTH_INACCESSIBLE * 2,
  WIDTH_INACCESSIBLE * 1.5,
];


const Crossings = (props) => {
  const { requireCurbRamps } = props;

  return (
    <React.Fragment>
      <Layer
        id='crossing-click'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        paint={{
          'line-width': {
            stops: [[12, 0.5], [16, 2], [22, 20]],
          },
          'line-opacity': 0,
        }}

        before='bridge-street'
      />
      <Layer
        id='crossing-inaccessible'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        filter={[
          'all',
          requireCurbRamps,
          ['!',
            ['to-boolean',
              ['get', 'curbramps'],
            ],
          ],
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
          'line-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            CROSSINGS_VISIBLE - 0.5, 0.0,
            CROSSINGS_VISIBLE, 1,
          ],
        }}
        before='bridge-street'
      />
      <Layer
        id='crossing-unmarked'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        filter={[
          'all',
          [
            'any',
            !requireCurbRamps,
            [
              'to-boolean',
              ['get', 'curbramps'],
            ],
          ],
          [
            '!',
            [
              'to-boolean',
              ['get', 'marked'],
            ],
          ],
        ]}
        paint={{
          'line-color': '#555',
          'line-gap-width': {
            stops: [[12, 0.5], [16, 3], [22, 30]],
          },
          'line-opacity': ['interpolate', ['linear'], ['zoom'],
            CROSSINGS_VISIBLE - 0.5, 0.0,
            CROSSINGS_VISIBLE, 1,
          ],
        }}
        before='bridge-street'
      />
      <Layer
        id='crossing-marked-background'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        layout={{ 'line-cap': 'round' }}
        filter={[
          'all',
          [
            'any',
            !requireCurbRamps,
            [
              'to-boolean',
              ['get', 'curbramps'],
            ],
          ],
          [
            'to-boolean',
            ['get', 'marked'],
          ],
        ]}
        paint={{
          'line-color': '#555',
          'line-width': {
            stops: [[12, 0.5], [16, 3], [22, 30]],
          },
          'line-opacity': ['interpolate', ['linear'], ['zoom'],
            CROSSINGS_VISIBLE - 0.5, 0.0,
            CROSSINGS_VISIBLE, 1,
          ],
        }}
        before='bridge-street'
      />
      <Layer
        id='crossing-marked-outline'
        type='line'
        sourceId='pedestrian'
        sourceLayer='crossings'
        layout={{ 'line-cap': 'round' }}
        filter={[
          'all',
          [
            'any',
            !requireCurbRamps,
            [
              'to-boolean',
              ['get', 'curbramps'],
            ],
          ],
          [
            'to-boolean',
            ['get', 'marked'],
          ],
        ]}
        paint={{
          'line-color': '#fff',
          'line-gap-width': {
            stops: [[12, 0.4], [16, 1.5], [22, 15]],
          },
          'line-width': { stops: [[12, 0.1], [16, 0.5], [22, 4]] },
          'line-opacity': ['interpolate', ['linear'], ['zoom'],
            CROSSINGS_VISIBLE - 0.5, 0.0,
            CROSSINGS_VISIBLE, 1,
          ],
        }}
        before='bridge-street'
      />
    </React.Fragment>
  );
};

Crossings.propTypes = {
  requireCurbRamps: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  requireCurbRamps: state.routingprofile.requireCurbRamps,
});

export default connect(
  mapStateToProps,
)(Crossings);
