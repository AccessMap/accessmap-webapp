import React from "react";
import SVGIcon from "react-md/src/js/SVGIcons";

interface Props {
  fill: string;
  size?: number;
}

const SidewalkIcon = ({ fill = "none", size = 48 }: Props) => {
  return (
    <SVGIcon className="sidewalk-icon" viewBox={"0 0 48 12"}>
      <rect
        x="2"
        y="2"
        width="44"
        height="8"
        ry="3.44"
        opacity="0.97"
        stroke="#000"
        strokeWidth=".5"
        fill={fill}
      />
    </SVGIcon>
  );
};

export default SidewalkIcon;
