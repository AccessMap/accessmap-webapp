import React from "react";
import PropTypes from "prop-types";

import { uphillColorMap, downhillColorMap } from "colors";

const SpeedLegend = props => {
  const { isDownhill, n, uphillMax, downhillMax, maxSpeed } = props;

  const colorMapFactory = isDownhill ? downhillColorMap : uphillColorMap;
  const limit = isDownhill ? -1 * downhillMax : uphillMax;
  const colorMap = colorMapFactory(uphillMax, downhillMax, maxSpeed);

  const xMax = 0.15;
  // const xMax = isDownhill ? downhillMax : uphillMax;

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
        {inclines.map((d, i) => (
          <div
            key={`legend-incline-label-${d}`}
            style={{
              position: "absolute",
              left: `calc((100% / ${n}) * ${i} + (100% / ${n} / 2))`,
              top: "10px",
              fontSize: "10pt",
              textAlign: "center"
            }}
          >
            <div style={{ position: "relative", left: "-50%" }}>
              {parseInt(i)}
            </div>
          </div>
        ))}
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
      <div
        className="legend-speed-label"
        style={{
          display: "absolute",
          left: 0
        }}
      >
        <div style={{ position: "absolute", left: "50%" }}>
          <div
            className="legend-speed-short-description"
            style={{
              position: "relative",
              top: "6px",
              left: "-50%",
              fontSize: "10pt"
            }}
          >
            {"Steepness (incline %)"}
          </div>
        </div>
      </div>
    </div>
  );
};

SpeedLegend.propTypes = {
  isDownhill: PropTypes.bool,
  n: PropTypes.number,
  uphillMax: PropTypes.number.isRequired,
  downhillMax: PropTypes.number.isRequired,
  maxSpeed: PropTypes.number.isRequired
};

SpeedLegend.defaultProps = {
  isDownhill: false,
  n: 7
};

export default SpeedLegend;
