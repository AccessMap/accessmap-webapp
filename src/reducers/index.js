import { router5Reducer } from "redux-router5";

import activities from "./activities";
import analytics from "./analytics";
import auth from "./auth";
import browser from "./browser";
import geolocation from "./geolocation";
import linkoverlay from "./link-overlay";
import log from "./log";
import map from "./map";
import profile from "./profile";
import routesettings from "./route-settings";
import route from "./route";
import toasts from "./toasts";
import tour from "./tour";
import view from "./view";
import waypoints from "./waypoints";

/**
 * Routing to be implemented
 */
export default {
  activities,
  analytics,
  auth,
  browser,
  geolocation,
  linkoverlay,
  log,
  map,
  profile,
  route,
  router: router5Reducer,
  routesettings,
  toasts,
  tour,
  view,
  waypoints
};
