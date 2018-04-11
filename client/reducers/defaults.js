import profiles from 'profiles';
import cloneObject from 'utils/clone-object';

export const defaultActivities = {
  fetchingTrip: false,
  planningTrip: false,
  settingProfile: false,
  showTripOptions: false,
  viewingMapInfo: false,
};

export const defaultAnalytics = null;

export const defaultBrowser = {
  mediaType: null,
};

export const defaultGeolocation = null;

export const defaultLinkOverlay = null;

export const defaultLog = {
  bounds: null,
  omniCardDim: null,
};

export const defaultMap = {
  inclineUphill: true,
  selectedFeature: null,
};

export const defaultProfile = {
  profiles: Object.values(cloneObject(profiles)),
  selectedProfile: 0,
  editorMode: 'UPHILL',
};

export const defaultToasts = [];

export const defaultTripPlanning = {
  routeResult: null,
  dateTime: new Date().getTime(),
  geocoderText: {
    searchText: '',
    originText: '',
    destinationText: '',
  },
};

export const defaultView = {
  lng: -122.333592,
  lat: 47.605628,
  zoom: 15,
  mapWidth: null,
  mapHeight: null,
};

export const defaultWaypoints = {
  destination: null,
  origin: null,
  poi: null,
};
