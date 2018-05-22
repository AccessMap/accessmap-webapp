import getDisplayMode from 'utils/display-mode';
import getMediaType from 'utils/media-type';


const getVisibleMargins = () => {
  const margins = {
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
  };

  const omnicard = document.getElementsByClassName('omnicard')[0];
  const mediaType = getMediaType();
  const displayMode = getDisplayMode();

  if (omnicard) {
    if (mediaType === 'mobile') {
      if (displayMode === 'portrait') {
        margins.top += omnicard.clientHeight + 16;
      }
      if (displayMode === 'landscape') {
        margins.left += omnicard.clientWidth + 16;
      }
    } else {
      margins.left += omnicard.clientWidth + 16;
    }
  }

  // 128 px is expected height of the card. We can't get the height of
  // the card dynamically, as it gets created as a result of this action.
  if (mediaType === 'mobile') {
    if (displayMode === 'portrait') {
      margins.bottom += 128 + 16;
    }
  } else {
    margins.bottom += 128 + 16;
  }

  // To account for zoom buttons
  margins.right += 48;

  return margins;
};

export default getVisibleMargins;
