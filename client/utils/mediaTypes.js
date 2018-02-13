import {
  TABLET_MIN_WIDTH,
  DESKTOP_MIN_WIDTH,
} from 'react-md/lib/constants/media';


export default function getMediaType() {
    const matchDesktop = window.matchMedia(`
      screen and (min-width: ${DESKTOP_MIN_WIDTH}px)
    `).matches;

    if (matchDesktop) return 'DESKTOP';

    const matchTablet = window.matchMedia(`
      screen and (min-width: ${TABLET_MIN_WIDTH}px)
    `).matches;

    if (matchTablet) return 'TABLET';

    return 'MOBILE';
}
