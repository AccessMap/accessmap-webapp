import analytics from 'redux-analytics';
import rakam from 'rakam-js';
import uuid from 'uuid';

const createAnalyticsMiddleware = () => {
  // Rakam Analytics
  const analyticsURL = `//${window.location.host}/analytics`;
  const analyticsWriteKey = process.env.ANALYTICS_KEY;

  const middleware = analytics(({ type, payload }, state) => {
    if (state.analytics || state.analytics == null) {
      switch (type) {
        case 'load-app': {
          // Initialize rakam
          let userID;
          if (rakam.getUserId()) {
            userID = rakam.getUserId();
          } else {
            userID = state.auth ? state.auth.sub : uuid.v4();
          }
          rakam.init(
            analyticsWriteKey,
            userID,
            {
              apiEndpoint: analyticsURL,
              includeUtm: true,
              trackClicks: true,
              trackForms: true,
              includeReferrer: true,
            },
          );
          break;
        }
        case 'initialize-emission':
          if (payload) {
            rakam.setUserId(payload);
          }
          break;
        case 'user-logged-in':
          rakam.setUserId(payload.sub);
          rakam.setSuperProperties({
            user_preferred_username: payload.preferredUsername,
          }, true);
          break;
        case 'user-logged-out':
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
