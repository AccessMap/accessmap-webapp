import analytics from "redux-analytics";
import jwtDecode from "jwt-decode";
import rakam from "rakam-js";

const createAnalyticsMiddleware = () => {
  // Rakam Analytics
  const analyticsURL = `//${window.location.host}/analytics`;

  const middleware = analytics(({ type, payload }, state) => {
    if (state.analytics.enabled) {
      switch (type) {
        case "load-app":
          // Initialize rakam
          /* eslint-disable no-undef */
          // NOTE: auth.sub is null when not logged in - Rakam generates its own ID
          rakam.init(ANALYTICS_KEY, state.auth.sub, {
            /* eslint-enable no-undef */
            apiEndpoint: analyticsURL,
            includeUtm: true,
            trackClicks: true,
            trackForms: true,
            includeReferrer: true
          });
          rakam.setSuperProperties(
            {
              _ip: true,
              _user_agent: true,
              _referrer: document.referrer,
              resolution: window.screen.width + " × " + window.screen.height
            },
            true
          );
          break;
        case "log-in":
          rakam.setUserId(jwtDecode(payload.accessToken).sub);
          rakam.setSuperProperties(
            {
              user_preferred_username: payload.preferredUsername
            },
            true
          );
          break;
        case "log-out":
          rakam.setUserId(null);
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
