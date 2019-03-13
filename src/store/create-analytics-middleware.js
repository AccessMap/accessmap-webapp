import analytics from "redux-analytics";
import rakam from "rakam-js";
import uuid from "uuid";

const createAnalyticsMiddleware = () => {
  // Rakam Analytics
  const analyticsURL = `//${window.location.host}/analytics`;

  const middleware = analytics(({ type, payload }, state) => {
    if (state.analytics.enabled) {
      switch (type) {
        case "load-app":
          // Initialize rakam
          rakam.init(
            ANALYTICS_KEY,
            state.auth ? state.auth.sub : uuid.v4(),
            {
              apiEndpoint: analyticsURL,
              includeUtm: true,
              trackClicks: true,
              trackForms: true,
              includeReferrer: true
            }
          );
          break;
        case "user-logged-in":
          rakam.setUserId(payload.sub);
          rakam.setSuperProperties(
            {
              user_preferred_username: payload.preferredUsername
            },
            true
          );
          break;
        case "user-logged-out":
          rakam.setUserId(uuid.v4());
          break;
        default:
          break;
      }
      if (rakam.options.apiKey) {
        rakam.logEvent(type, { ...payload });
      }
    }
  });

  return middleware;
};

export default createAnalyticsMiddleware;
