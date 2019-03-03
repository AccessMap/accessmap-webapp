import { ENABLE_ANALYTICS, DISABLE_ANALYTICS } from "actions";

import { defaultAnalytics as defaults } from "./defaults";

export default (state = defaults, action) => {
  switch (action.type) {
    case ENABLE_ANALYTICS:
      return true;
    case DISABLE_ANALYTICS:
      return false;
    default:
      return state;
  }
};
