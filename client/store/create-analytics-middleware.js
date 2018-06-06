import analytics from 'redux-analytics';
import rakam from 'rakam-js';

const createAnalyticsMiddleware = () => {
  // Rakam Analytics
  const analyticsURL = `//${window.location.host}/analytics`;
  const analyticsWriteKey = process.env.ANALYTICS_KEY;
  rakam.init(analyticsWriteKey, null, {
    apiEndpoint: analyticsURL,
    includeUtm: true,
    trackClicks: true,
    trackForms: true,
    includeReferrer: true,
  });
  const middleware = analytics(({ type, payload }, state) => {
    if (state.analytics || state.analytics == null) {
      // Do user check
      if (state.auth.user) {
        if (rakam.getUserId() !== state.auth.user.profile.email) {
          rakam.setUserId(state.auth.user.profile.email);
        }
      } else if (rakam.getUserId()) {
        rakam.setUserId(null);
      }
      rakam.logEvent(type, { ...payload });
    }
  });

  return middleware;
};

export default createAnalyticsMiddleware;
