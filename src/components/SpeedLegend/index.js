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

  // FIXME: Place this CSS as importable scss so that modularization is easier - should
  // be able to override in stylesheets section!

  return (
    <div className="legend-speed">
      <div className="legend-speed-cell-container">
        <hr
          className="legend-speed-disabled-cell"
          style={{
            position: "absolute",
            left: 0,
            top: "-1px",
            height: 0,
            width: "100%",
            backgroundColor: "transparent",
            border: "0 none",
            borderTop: "dashed",
            borderColor: "red",
            borderWidth: "1.5px"
          }}
        />
        {coloredCells.map((c, i) => (
          <div
            key={`legend-incline-cell-${c}`}
            className="legend-speed-cell"
            style={{
              backgroundColor: c,
              position: "absolute",
              left: `calc((100% / ${n}) * ${i})`,
              top: "4px",
              width: `calc(100% / ${n})`,
              height: "8px"
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
