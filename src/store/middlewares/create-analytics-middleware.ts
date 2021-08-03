import jwtDecode from "jwt-decode";
import rakam from "rakam-js";

import { load as loadApp } from "features/app/app-slice";
import {
  enable as enableAnalytics,
  disable as disableAnalytics,
} from "features/analytics/analytics-slice";
import {
  clickDirectionsInfoButton,
  clickDirectionsInfoCloseButton,
  clickStepsButton,
  clickStepsCloseButton,
  requestDirections,
} from "features/directions/directions-slice";
import {
  show as showDrawer,
  hide as hideDrawer,
} from "features/drawer/drawer-slice";
import {
  clear as clearGeolocation,
  requestGeolocation,
} from "features/geolocation/geolocation-slice";
import {
  close as closeLinksModal,
  click as clickModalLink,
} from "features/links-modal/links-modal-slice";
import {
  load as loadMap,
  click as clickMap,
  moveEnd as moveEndMap,
  zoom as zoomMap,
  mouseOverDownhill,
  mouseOutDownhill,
  clickMapLegendButton,
  clickMapLegendCloseButton,
} from "features/map/map-slice";
import {
  clickOmniCardTripPlanningButton,
  clickOmniCardTripPlanningCloseButton,
} from "features/omnicard/omnicard-slice";
import {
  fetchProfile,
  saveProfile,
  editProfile,
  select as selectProfile,
  clickProfileEditButton,
  clickProfileEditCloseButton,
  customUphillMax,
  customDownhillMax,
  customAvoidCurbs,
} from "features/profiles/profiles-slice";
import {
  startSelecting as startSelectingRegion,
  endSelecting as endSelectingRegion,
  set as setRegion,
} from "features/region/region-slice";
import {
  enable as enableTour,
  disable as disableTour,
  complete as completeTour,
} from "features/tour/tour-slice";
import { setDate, setTime } from "features/trip-options/trip-options-slice";
import {
  logIn,
  logOut,
  openSignupPrompt,
  closeSignupPrompt,
} from "features/user/user-slice";
import {
  setOrigin,
  setDestination,
  swapWaypoints,
  routeFromPOI,
  routeToPOI,
} from "features/waypoints/waypoints-slice";

interface AnalyticsMiddlewareOptions {
  // A URL for the location of the Rakam endpoint. TODO: URL type didn't work,
  // but is there another string "type" to use?
  endpoint: string;
}

const createAnalyticsMiddleware = (options: AnalyticsMiddlewareOptions) => {
  // Rakam Analytics
  const analyticsURL = options.endpoint;

  const initializeRakam = (userName: string) => {
    rakam.init(ANALYTICS_KEY, userName, {
      apiEndpoint: analyticsURL,
      includeUtm: true,
      trackClicks: true,
      trackForms: true,
      includeReferrer: true,
    });
    rakam.setSuperProperties(
      {
        _ip: true,
        _user_agent: true,
        _referrer: document.referrer,
        resolution: window.screen.width + " × " + window.screen.height,
      },
      true
    );
  };

  const middleware = (store) => (next) => (action) => {
    if (!store.getState().analytics.enabled) {
      return next(action);
    }
    /* eslint-enable no-unused-vars */
    switch (action.type) {
      // App slice. Also the first to run in the 'main' app state, will set up
      // Rakam itself.
      case loadApp.type: {
        // Initialize rakam
        // Note on the user.sub state:
        //   1. If it's null (user not logged in, value not rehydrated from
        //   locatelStorage), an anonymous id session is initiated.
        //   2. If the user logs in later, the user value will be set through
        //   rakam and previous events will be retroactively labeled as being
        //   done by that logged-in user.
        const { sub } = store.getState().user;
        initializeRakam(sub);

        // Send the "load-app" metadata event to rakam
        rakam.logEvent("load-app");

        break;
      }
      // Activities feature has no actions, only listens to other action
      // Analytics feature -- user enables or disables tracking
      case enableAnalytics.type: {
        rakam.logEvent("enable-analytics");

        if (rakam._sessionId !== null) {
          // Rakam has not been initialized - do so.
          const { sub } = store.getState().user;
          initializeRakam(sub);
        }
        break;
      }
      case disableAnalytics.type:
        rakam.logEvent("disable-analytics");
        // No need to disable the rakam API because there's a higher-level
        // guard based on the analytics.enabled state.
        break;
      // Directions feature -- tracks route requests and whether directions
      // steps or additional info are closed. TODO: should really move omnicard
      // feature's tracking of opening directions-steps and directions-info to
      // this feature.
      case clickDirectionsInfoButton.type:
        rakam.logEvent("directions-info");
        break;
      case clickDirectionsInfoCloseButton.type:
        rakam.logEvent("directions");
        break;
      case clickStepsButton.type:
        rakam.logEvent("directions-steps");
        break;
      case clickStepsCloseButton.type:
        rakam.logEvent("directions");
      case requestDirections.pending.type: {
        const { waypoints } = store.getState().waypoints;
        const { profiles, selected } = store.getState().profiles;
        const { dateTime } = store.getState().tripOptions;

        rakam.logEvent("request-route", {
          origin: waypoints[0],
          destination: waypoints[1],
          profile: profiles[selected],
          tripOptions: { dateTime },
        });
        break;
      }
      case requestDirections.fulfilled.type:
        rakam.logEvent("receive-route", {
          routeResult: action.payload,
        });
        break;
      case requestDirections.rejected.type:
        const { waypoints } = store.getState().waypoints;
        rakam.logEvent("failed-route", {
          origin: waypoints[0],
          destination: waypoints[1],
        });
        break;
      // Drawer feature -- show/hide state for the app drawer
      case showDrawer.type:
        rakam.logEvent("show-drawer");
        break;
      case hideDrawer.type:
        rakam.logEvent("hide-drawer");
        break;
      // TODO: consider including the geocoders' state?
      // Geolocation feature -- attempting to geolocate, state of this process
      case clearGeolocation.type:
        rakam.logEvent("clear-geolocation");
        break;
      case requestGeolocation.fulfilled.type:
        rakam.logEvent("receive-geolocation");
        break;
      case requestGeolocation.rejected.type:
        rakam.logEvent("no-geolocation");
        break;
      // 'Link overlay' state - the 'about' and 'contact' links
      case closeLinksModal.type:
        rakam.logEvent("close-link-overlay");
        break;
      case clickModalLink.type: {
        if (action.payload === "about") {
          rakam.logEvent("click-about-link");
        } else if (action.payload === "contact") {
          rakam.logEvent("click-contact-link");
        }
        break;
      }
      // Map feature -- map state tracking
      case loadMap.type:
        rakam.logEvent("load-map");
        break;
      case clickMap.type:
        rakam.logEvent("map-click", {
          feature: {
            lon: action.payload.lon,
            lat: action.payload.lat,
            layer: action.payload.layer,
            layerName: action.payload.layerName,
            properties: action.payload.properties,
          },
        });
        break;
      case moveEndMap.type: {
        const { lon, lat, zoom, bounds } = store.getState().map;
        rakam.logEvent("map-move", { lon, lat, zoom, bounds });
        break;
      }
      case zoomMap.type:
        rakam.logEvent("map-zoom");
        break;
      case mouseOverDownhill.type:
        rakam.logEvent("mouse-over-downhill");
        break;
      case mouseOutDownhill.type:
        rakam.logEvent("mouse-out-downhill");
        break;
      case clickMapLegendButton.type:
        rakam.logEvent("view-map-info");
        break;
      case clickMapLegendCloseButton.type:
        rakam.logEvent("close-map-info");
        break;
      // Omnicard feature -- tracking trip planning button state for some
      // reason.
      case clickOmniCardTripPlanningButton.type:
        rakam.logEvent("plan-trip");
        break;
      case clickOmniCardTripPlanningCloseButton.type:
        rakam.logEvent("exit-trip-planning");
        break;
      // Profiles feature -- tracks when profile editor is closed, profile
      // editing
      case editProfile.type:
        rakam.logEvent("toggle-setting-profile");
        break;
      case clickProfileEditButton.type:
      case clickProfileEditCloseButton.type:
        rakam.logEvent("toggle-setting-profile");
        break;
      case selectProfile.type:
        rakam.logEvent("set-profile", { profile: action.payload });
        break;
      case customUphillMax.type:
        rakam.logEvent("set-uphill-max", { value: action.payload });
        break;
      case customDownhillMax.type:
        rakam.logEvent("set-downhill-max", { value: action.payload });
        break;
      case customAvoidCurbs.type:
        rakam.logEvent("toggle-curbramps");
        break;
      // Regions feature -- tracks whether user is selecting a regions.
      case startSelectingRegion.type:
        rakam.logEvent("open-region-selections");
        break;
      case endSelectingRegion.type:
        rakam.logEvent("close-region-selections");
        break;
      case setRegion.type:
        rakam.logEvent("select-region", { regionKey: action.payload });
        break;
      // Tour state - start, exit, and complete
      case enableTour.type:
        rakam.logEvent("enable-tour");
        break;
      case disableTour.type:
        rakam.logEvent("disable-tour");
        break;
      case completeTour.type:
        rakam.logEvent("complete-tour");
        break;
      // Trip planning options - options specific to the trip
      case setDate.type:
        rakam.logEvent("set-date");
        break;
      case setTime.type:
        rakam.logEvent("set-time");
        break;
      // User state - particularly authentication
      case logIn.type: {
        const { sub } = jwtDecode(action.payload.accessToken);
        rakam.setUserId(sub);
        rakam.setSuperProperties(
          {
            user_preferred_username: sub,
          },
          true
        );
        rakam.logEvent("log-in");
        break;
      }
      case logOut.type:
        rakam.setUserId(null);
        rakam.logEvent("log-out");
        break;
      case openSignupPrompt.type:
        rakam.logEvent("open-signup-prompt");
        break;
      case closeSignupPrompt.type:
        rakam.logEvent("close-signup-prompt");
        break;
      case fetchProfile.pending.type:
        rakam.logEvent("fetch-profile-request");
        break;
      case fetchProfile.fulfilled.type:
        rakam.logEvent("fetch-profile-success");
        break;
      case fetchProfile.rejected.type: {
        if (action.payload === "no-saved-profiles") {
          rakam.logEvent("no-saved-profiles");
        } else if (action.payload === "fetch-profile-failed") {
          rakam.logEvent("fetch-profile-failure");
        }
        break;
      }
      case saveProfile.pending.type:
        rakam.logEvent("save-profile-request");
        break;
      case saveProfile.fulfilled.type:
        rakam.logEvent("save-profile-success");
        break;
      case saveProfile.rejected.type:
        rakam.logEvent("save-profile-failure");
        break;
      // Waypoints state - POI/clicked location inspection and setting origin
      // and destination
      case setOrigin.type: {
        rakam.logEvent("set-origin", {
          lon: action.payload.lon,
          lat: action.payload.lat,
          name: action.payload.name,
        });
        break;
      }
      case setDestination.type:
        rakam.logEvent("set-destination", {
          lon: action.payload.lon,
          lat: action.payload.lat,
          name: action.payload.name,
        });
        break;
      // TODO: create a 'showPOI' action? What tracks whether a POI's metadata
      // is being shown?
      case swapWaypoints.type:
        rakam.logEvent("swap-waypoints");
        break;
      case routeFromPOI.type:
        rakam.logEvent("route-from-poi");
        break;
      case routeToPOI.type:
        rakam.logEvent("route-to-poi");
        break;
    }
    return next(action);
  };

  return middleware;
};

export default createAnalyticsMiddleware;
