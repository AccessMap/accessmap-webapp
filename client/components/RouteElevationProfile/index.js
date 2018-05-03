import React from 'react';

import SVGIcon from 'react-md/src/js/SVGIcons';

import { lineFeatureCollection } from 'prop-schema';

const RouteElevationProfile = (props) => {
  const {
    route,
  } = props;

  const w = 100;
  const h = 50;
  const insetBy = 4;
  const marginRight = 24;
  const marginBottom = 6;

  const data = [[0, 0]];
  const legs = route.legs;
  let totalLength = 0;
  let totalHeight = 0;
  let maxHeight = 0;
  let minHeight = 0;
  legs.forEach((leg) => {
    leg.forEach((step) => {
      const incline = step.properties.incline || 0;
      const height = step.properties.length * (incline / 1000);
      totalLength += step.properties.length;
      totalHeight += height;

      maxHeight = Math.max(maxHeight, totalHeight);
      minHeight = Math.min(minHeight, totalHeight);

      data.push([
        totalLength,
        totalHeight,
      ]);
    });
  });

  const xMin = insetBy;
  const xMax = w - insetBy - marginRight;
  const dx = xMax - xMin;

  const yMin = insetBy;
  const yMax = h - insetBy - marginBottom;
  const dy = yMax - yMin;

  const normalized = data.map(d => [
    dx * (d[0] / totalLength),
    dy * ((d[1] - minHeight) / (maxHeight - minHeight)),
  ]);

  return (
    <SVGIcon
      viewBox={`0 0 ${w} ${h}`}
      className='route-elevation-profile'
    >
      <path
        d={normalized.map((d, i) => (
          `${i === 0 ? 'M' : 'L'}${d[0] + insetBy} ${h - marginBottom - d[1] - insetBy}`
        )).join(' ')}
      />
      <text
        x={w - marginRight}
        y={6}
        fontSize={6}
      >
        {Math.round(maxHeight, 1)}
      </text>
      <text
        x={w - marginRight}
        y={h - marginBottom}
        fontSize={6}
      >
        {Math.round(minHeight, 1)}
      </text>
      <text
        x={w - 8}
        y={Math.floor((h - marginBottom) / 2)}
        fontSize={6}
        textAnchor='middle'
        transform={`rotate(270,${w - 8}, ${Math.floor((h - marginBottom) / 2)})`}
      >
        {'Height (meters)'}
      </text>
      <text
        x={0}
        y={h}
        fontSize={6}
      >
        {0}
      </text>
      <text
        x={w - marginRight - 8}
        y={h}
        fontSize={6}
      >
        {Math.round(totalLength, 1)}
      </text>
      <text
        x={Math.floor((w - marginRight) / 2)}
        y={h}
        fontSize={6}
        textAnchor='middle'
      >
        {'Distance (meters)'}
      </text>
    </SVGIcon>
  );
};

RouteElevationProfile.propTypes = {
  route: lineFeatureCollection.isRequired,
};

export default RouteElevationProfile;
