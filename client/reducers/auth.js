import {
  GOT_USER,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
} from 'actions';

import { defaultAuth as defaults } from './defaults';

export default (state = defaults, action) => {
  switch (action.type) {
    case GOT_USER:
    case USER_LOGGED_IN:
      return { user: action.payload };
    case USER_LOGGED_OUT:
      return { user: null };
    default:
      return state;
  }
};
