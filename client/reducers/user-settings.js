import {
  SET_TRACKING
} from 'actions';

import { defaultUserSettings as defaults } from './defaults';

export default function handle(state = defaults, action) {
  switch (action.type) {
    case SET_TRACKING:
      return {
        track: action.payload
      };
    default:
      return state;
  }
}
