import profiles from 'profiles';
import cloneObject from 'utils/clone-object';

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
  showTripOptions: false,
  viewingMapInfo: false,
};

export const defaultTripPlanning = {
  routeResult: null,
  dateTime: new Date().getTime(),
  geocoderText: {
    searchText: '',
    originText: '',
    destinationText: '',
  },
};

export const defaultRoutingProfile = {
  profiles: Object.values(cloneObject(profiles)),
  selectedProfile: 0,
};

export const defaultView = {
  lng: -122.333592,
  lat: 47.605628,
  zoom: 15,
  mapWidth: null,
  mapHeight: null,
};

export const defaultLog = {
  bounds: null,
  omniCardDim: null,
};

export const defaultMap = {
  inclineUphill: true,
  selectedFeature: null,
};

export const defaultGeolocation = null;

export const defaultSettingsEditor = {
  mode: 'UPHILL',
};

export const defaultBrowser = {
  mediaType: null,
};

export const defaultLinkOverlay = null;

export const defaultToasts = [];
