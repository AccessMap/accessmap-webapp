import {
  ADD_TOAST,
  FAILED_ROUTE,
  POP_TOAST,
  LOG_IN,
  LOG_OUT,
  RECEIVE_ROUTE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILURE
} from "actions";

import { defaultToasts as defaults } from "reducers/defaults";

export default (state = defaults, action) => {
  const toasts = state.slice();
  let text;
  switch (action.type) {
    case ADD_TOAST:
      toasts.push(action.payload);
      return toasts;
    case POP_TOAST:
      toasts.shift();
      return toasts;
    case LOG_IN:
      toasts.push("You have been logged in.");
      return toasts;
    case LOG_OUT:
      toasts.push("You have been logged out.");
      return toasts;
    case SAVE_PROFILE_SUCCESS:
      toasts.push("Profile saved!");
      return toasts;
    case SAVE_PROFILE_FAILURE:
      toasts.push("Failed to save profile. Try again or contact us.");
      return toasts;
    case RECEIVE_ROUTE:
      switch (action.payload.routeResult.status) {
        case "InvalidWaypoint":
          if (action.payload.routeResult.status_data.index === 0) {
            text = "No usable footway near origin.";
          } else {
            text = "No usable footway near destination.";
          }
          break;
        case "NoPath":
          text = "No path found between those points.";
          break;
        default:
          break;
      }
      if (text !== undefined) {
        toasts.push(text);
      }
      return toasts;
    case FAILED_ROUTE:
      switch (action.payload.error) {
        case "500":
        case "504":
          toasts.push("Could not fetch route: server error");
          return toasts;
        default:
          return toasts;
      }
    default:
      return state;
  }
};
