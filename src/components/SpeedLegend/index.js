import React from "react";
import PropTypes from "prop-types";

import { uphillColorMap, downhillColorMap } from "colors";

const SpeedLegend = props => {
  const { isDownhill, n, maxUphill, maxDownhill, maxSpeed } = props;

  const colorMapFactory = isDownhill ? downhillColorMap : uphillColorMap;
  const colorMap = colorMapFactory(maxUphill, maxDownhill, maxSpeed);

  const limit = isDownhill ? maxDownhill : maxUphill;

  const nSide = parseInt(n / 2);
  // TODO: center at ideal incline instead of 0?
  const inclines = [...Array(n).keys()].map(d => (limit * (d - nSide)) / nSide);
  // TODO: consider inlining CSS so there's on source of truth

  return (
    <div className="legend-speed">
      <div className="legend-speed-cell-container">
        {inclines.map(i => (
          <div
            key={`legend-incline-cell-${i}`}
            className="legend-speed-cell"
            style={{ backgroundColor: colorMap(i) }}
          />
        ))}
      </div>
      <div className="legend-speed-labels">
        <div className="legend-speed-downhill">
          {`${(maxDownhill * 100).toFixed(1)} %`}
        </div>
        <div className="legend-speed-short-description">
          {"Difficulty at incline"}
        </div>
        <div className="legend-speed-uphill">
          {`${(maxUphill * 100).toFixed(1)} %`}
        </div>
      </div>
    </div>
  );
};

SpeedLegend.propTypes = {
  isDownhill: PropTypes.bool,
  n: PropTypes.number,
  maxUphill: PropTypes.number.isRequired,
  maxDownhill: PropTypes.number.isRequired,
  maxSpeed: PropTypes.number.isRequired
};

SpeedLegend.defaultProps = {
  isDownhill: false,
  n: 7
};

export default SpeedLegend;
