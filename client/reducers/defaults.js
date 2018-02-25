import profiles from 'profiles';

export const defaultAnalytics = null;

export const defaultWaypoints = {
  destination: null,
  origin: null,
  poi: null,
};

export const defaultActivities = {
  fetchingTrip: false,
  planningTrip: false,
  settingProfile: false,
};

export const defaultTripPlanning = {
  routeResult: null,
  geocoderText: {
    searchText: '',
    originText: '',
    destinationText: '',
  },
};

export const defaultRoutingProfile = profiles.wheelchair;

export const defaultView = {
  lng: -122.333592,
  lat: 47.605628,
  zoom: 15,
  mapWidth: null,
  mapHeight: null,
};

export const defaultLog = {
  bounds: null,
};

export const defaultMap = {
  selectedFeature: null,
  contextClick: null,
};

export const defaultGeolocation = null;

export const defaultMode = 'UPHILL';

export const defaultBrowser = {
  mediaType: null,
};

export const defaultLinkOverlay = null;

export const defaultToasts = [];
