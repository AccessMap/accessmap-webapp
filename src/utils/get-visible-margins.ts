import { Media, Orientation } from "types";

// Amount to pad the margins to decrease the chance that map elements are
// obscured.
const PADDING = 16;

export interface Margins {
  left: number;
  bottom: number;
  right: number;
  top: number;
}

const getVisibleMargins = (
  mediaType: Media,
  orientation: Orientation
): Margins => {
  const margins = {
    left: PADDING,
    bottom: PADDING,
    right: PADDING,
    top: PADDING,
  };

  const omnicard = document.getElementsByClassName("omnicard")[0];

  if (omnicard) {
    if (mediaType === "mobile" && orientation === "portrait") {
      // In mobile portrait mode, the OmniCard is full-width and takes up a
      // portion of the top of the screen. Account for this by adding a top
      // margin and adding a little extra padding so that map elements like
      // markers aren't covered by the OmniCard.
      margins.top += omnicard.clientHeight;
    } else {
      // In all other contexts, the OmniCard is full-height and takes up a
      // portion of the left of the screen. Therefore, adjust the left margin.
      margins.left += omnicard.clientWidth;
    }
  }

  return margins;
};

export default getVisibleMargins;
