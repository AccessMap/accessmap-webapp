import React from "react";

import { uphillColorMap, downhillColorMap } from "colors";

import { useAppSelector } from "hooks";

// Number of colored speed bars to display
const N_BARS = 16;

const SpeedLegend = () => {
  const { uphillMode } = useAppSelector((state) => state.map);
  const { selected, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles[selected];
  const { uphillMax, downhillMax, speed } = profile;

  const colorMapFactory = uphillMode ? uphillColorMap : downhillColorMap;
  const limit = uphillMode ? uphillMax : -1 * downhillMax;
  const colorMap = colorMapFactory(uphillMax, downhillMax, speed);

  const xMax = 0.15;

  const inclines = [...Array(N_BARS).keys()].map((d) => xMax * (d / N_BARS));

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
    <div className="speed-legend">
      <div className="speed-legend-cell-container">
        <hr
          className="speed-legend-disabled-cell"
          style={{
            position: "absolute",
            left: 0,
            top: "-5px",
            height: 0,
            width: "100%",
            backgroundColor: "transparent",
            border: "0 none",
            borderTop: "dashed",
            borderColor: "red",
            borderWidth: "1.5px",
          }}
        />
        {inclines.map((d, i) => (
          <div
            key={`legend-incline-label-${d}-${i}`}
            style={{
              position: "absolute",
              left: `calc((100% / ${N_BARS}) * ${i} + (100% / ${N_BARS} / 2))`,
              top: "6px",
              fontSize: "10pt",
              textAlign: "center",
            }}
          >
            <div style={{ position: "relative", left: "-50%" }}>{i}</div>
          </div>
        ))}
        {coloredCells.map((c, i) => (
          <div
            key={`legend-incline-cell-${c}-${i}`}
            className="speed-legend-cell"
            style={{
              backgroundColor: c,
              position: "absolute",
              left: `calc((100% / ${N_BARS}) * ${i})`,
              top: 0,
              width: `calc(100% / ${N_BARS})`,
              height: "8px",
              border: "0 none",
              borderTopStyle: "solid",
              borderBottomStyle: "solid",
              borderLeftStyle: i === 0 ? "solid" : "none",
              borderRightStyle:
                i === coloredCells.length - 1 ? "solid" : "none",
              borderColor: "#a9a9a9",
              borderWidth: "1px",
            }}
          />
        ))}
      </div>
      <div
        className="speed-legend-label"
        style={{
          display: "absolute",
          left: 0,
        }}
      >
        <div style={{ position: "absolute", left: "50%" }}>
          <div
            className="speed-legend-short-description"
            style={{
              position: "relative",
              top: "6px",
              left: "-50%",
              fontSize: "10pt",
            }}
          >
            {"Speed at incline %"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedLegend;
