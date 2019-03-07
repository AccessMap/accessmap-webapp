import React from "react";
import PropTypes from "prop-types";

import { uphillColorMap, downhillColorMap } from "colors";

const SpeedLegend = props => {
  const { isDownhill, n, maxUphill, maxDownhill, maxSpeed } = props;

  const colorMapFactory = isDownhill ? downhillColorMap : uphillColorMap;
  const limit = isDownhill ? -1 * maxDownhill : maxUphill;
  const colorMap = colorMapFactory(maxUphill, maxDownhill, maxSpeed);

  const xMax = 0.15;
  // const xMax = isDownhill ? maxDownhill : maxUphill;

  const inclines = [...Array(n).keys()].map(d => xMax * (d / n));

  let coloredCells = [];
  let disabledCells = [];
  for (let i of inclines) {
    if (i > limit) {
      disabledCells.push(i);
    } else {
      coloredCells.push(colorMap(i));
    }
  }

  // TODO: draw with SVG for consistent behavior between browsers?

  return (
    <div className="legend-speed">
      <div className="legend-speed-cell-container">
        {coloredCells.map(c => (
          <div
            key={`legend-incline-cell-${c}`}
            className="legend-speed-cell"
            style={{ backgroundColor: c }}
          />
        ))}
        {disabledCells.map(d => (
          <hr
            key={`legend-incline-cell-${d}`}
            className="legend-speed-cell"
            style={{
              verticalAlign: "middle",
              backgroundColor: "transparent",
              border: "0 none",
              height: 0,
              borderTop: "dashed",
              borderColor: "red",
              borderWidth: "1.5px"
            }}
          />
        ))}
      </div>
      <div className="legend-speed-labels">
        <div className="legend-speed-downhill">
          {`${(0 * 100).toFixed(1)} %`}
        </div>
        <div className="legend-speed-short-description">
          {"Difficulty at incline"}
        </div>
        <div className="legend-speed-uphill">
          {`${(xMax * 100).toFixed(1)} %`}
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
