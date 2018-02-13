import React from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-mapbox-gl';
import SVGIcon from 'components/SVGIcon';


export default function MapMarker(props) {
  const {
    coordinates
  } = props;

  return (
    <Marker
      {...props}
      style={{
        pointerEvents: 'none',
        zIndex: 0,
      }}
      coordinates={coordinates}
      anchor='bottom'
    >
      <SVGIcon
        height={48}
        width={48}
        svgMinX={0}
        svgMinY={0}
        svgWidth={480}
        svgHeight={480}
        key='poi-icon'
      >
        <path
          fill='#e54a3a'
          key='svgicon-mainfill'
          d='m174.95 364.97c-26.9-48.72-57.27-95.6-81.941-145.5-28.875-69.04 0.815-156.02 65.741-193.2 29.73-16.705 65.08-27.212 99.3-22.091 60.49 7.326 114.84 51.508 133.09 109.85 15.714 48.734 4.3388 103.25-24.654 144.73-42.083 72.841-83.446 146.1-126.34 218.47-22.245-37.123-43.548-74.798-65.203-112.27zm82.077-144.19c36.694-9.8852 56.45-57.293 35.882-89.797-18.33-32.247-67.24-40.655-93.989-14.088-26.261 23.342-26.271 69.154 1.6012 91.255 15.239 13.16 37.093 18.495 56.506 12.629z'
        />,
        <path
          fill='#000'
          fillOpacity='.19608'
          key='svgicon-shading'
          d='m227.49 259.6c-50.807-5.4799-91.824-56.527-85.418-107.39 4.2957-47.237 46.908-88.759 94.973-88.38 34.189-1.7003 68.304 16.35 86.209 45.524 19.531 30.195 20.75 71.27 1.8869 102.09-18.94 32.781-57.684 53.185-95.508 48.42l-2.1434-0.25887zm32.321-38.866c33.487-10.042 52.218-52.024 37.36-83.687-13.135-30.897-53.896-47.216-84.037-31.115-26.347 12.534-41.461 44.936-32.744 73.045 8.2768 29.55 40.574 50.878 71.039 43.92 2.8402-0.52043 5.6441-1.241 8.3807-2.1624z'
        />
      </SVGIcon>
    </Marker>
  );
}

MapMarker.propTypes = {
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
};
