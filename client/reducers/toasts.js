import {
  ADD_TOAST,
  POP_TOAST,
  RECEIVE_ROUTE,
} from 'actions';

import { defaultToasts as defaults } from './defaults';

export default function handle(state = defaults, action) {
  const toasts = state.slice();
  switch (action.type) {
    case ADD_TOAST:
      toasts.push(action.payload);
      return toasts;
    case POP_TOAST:
      toasts.shift();
      return toasts;
    case RECEIVE_ROUTE:
      let text;
      switch (action.payload.routeResult.code) {
        case 'GraphNotReady':
        case 'SpatialIndexNotReady':
          text = 'Server is rebuilding the graph, please wait a few seconds and try again.';
          break;
        case 'BothFarAway':
          text = 'Start point is too far from any valid footpaths.';
          break;
        case 'OriginFarAway':
          text = 'End point is too far from any valid footpaths.';
          break;
        case 'DestinationFarAway':
          text = 'Both the start and ends points are too far from any valid footpaths.';
          break;
        case 'NoRoute':
          text = 'No path between those points. If you think this was in error, try placing the waypoint closer to a colored/filled-in footpath.';
          break;
        default:
          return toasts;
      }
      toasts.push(text);
      return toasts;
    default:
      return state;
  }
}
