import { TABLET_MIN_WIDTH, DESKTOP_MIN_WIDTH } from "constants/media";

const mediaType = (): "mobile" | "tablet" | "desktop" => {
  const matchDesktop = window.matchMedia(`
    screen and (min-width: ${DESKTOP_MIN_WIDTH}px)
  `).matches;

  if (matchDesktop) return "desktop";

  const matchTablet = window.matchMedia(`
    screen and (min-width: ${TABLET_MIN_WIDTH}px)
  `).matches;

  if (matchTablet) return "tablet";

  return "mobile";
};

export default mediaType;
