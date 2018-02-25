import {
  CLICK_ABOUT_LINK,
  CLICK_CONTACT_LINK,
  CLOSE_LINK_OVERLAY,
} from 'actions';

import { defaultLinkOverlay as defaults } from './defaults';

export default (state = defaults, action) => {
  switch (action.type) {
    case CLICK_ABOUT_LINK:
      return 'about';
    case CLICK_CONTACT_LINK:
      return 'contact';
    case CLOSE_LINK_OVERLAY:
      return null;
    default:
      return state;
  }
};
