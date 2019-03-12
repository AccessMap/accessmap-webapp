import { ENABLE_ANALYTICS, DISABLE_ANALYTICS } from "actions";

import { defaultAnalytics as defaults } from "reducers/defaults";

export default (state = defaults, action) => {
  switch (action.type) {
    case ENABLE_ANALYTICS:
      return { enabled: true };
    case DISABLE_ANALYTICS:
      return { enabled: false };
    default:
      return state;
  }
};
