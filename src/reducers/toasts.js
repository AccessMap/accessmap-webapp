import { ADD_TOAST, FAILED_ROUTE, POP_TOAST, RECEIVE_ROUTE } from "actions";

import { defaultToasts as defaults } from "./defaults";

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
    case RECEIVE_ROUTE:
      switch (action.payload.routeResult.code) {
        case "GraphNotReady":
        case "SpatialIndexNotReady":
          text =
            "Server is rebuilding the graph, please wait a few seconds and try again.";
          break;
        case "BothFarAway":
          text = "Start point is too far from any valid footpaths.";
          break;
        case "OriginFarAway":
          text = "End point is too far from any valid footpaths.";
          break;
        case "DestinationFarAway":
          text =
            "Both the start and ends points are too far from any valid footpaths.";
          break;
        case "NoRoute":
          text =
            "No path between those points. If you think this was in error, try placing the waypoint closer to a colored/filled-in footpath.";
          break;
        default:
          break;
      }
      switch (action.payload.routeResult.status) {
        case "Failed":
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
