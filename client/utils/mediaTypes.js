import {
  TABLET_MIN_WIDTH,
  DESKTOP_MIN_WIDTH,
} from 'react-md/src/js/constants/media';


const mediaType = () => {
  const matchDesktop = window.matchMedia(`
    screen and (min-width: ${DESKTOP_MIN_WIDTH}px)
  `).matches;

  if (matchDesktop) return 'DESKTOP';

  const matchTablet = window.matchMedia(`
    screen and (min-width: ${TABLET_MIN_WIDTH}px)
  `).matches;

  if (matchTablet) return 'TABLET';

  return 'MOBILE';
};


export default mediaType;
