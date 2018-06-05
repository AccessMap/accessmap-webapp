import {
  GOT_USER,
  USER_LOGGED_IN,
} from 'actions';

import { defaultAuth as defaults } from './defaults';

export default (state = defaults, action) => {
  switch (action.type) {
    case GOT_USER:
    case USER_LOGGED_IN:
      return { user: action.payload };
    default:
      return state;
  }
};
