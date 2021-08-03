import React from "react";

import Button from "react-md/src/js/Buttons";
import SVGIcon from "react-md/src/js/SVGIcons";

interface FloatingButtonProps {
  icon: string;
  onClick(): void;
  ariaLabel: string;
  tooltipLabel: string;
}

const FloatingButton = ({
  icon,
  onClick,
  ariaLabel,
  tooltipLabel,
}: FloatingButtonProps) => (
  <Button
    aria-label={ariaLabel}
    floating
    svg
    mini
    primary
    swapTheming
    tooltipLabel={tooltipLabel}
    tooltipPosition="left"
    onClick={onClick}
  >
    <SVGIcon use={icon} />
  </Button>
);

export default FloatingButton;
