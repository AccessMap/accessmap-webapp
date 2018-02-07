export const defaultWaypoints = {
  destination: null,
  origin: null,
  poi: null
};

export const defaultTripPlanning = {
  isFetching: false,
  inclineMax: 0.08,
  inclineMin: -0.1,
  inclineIdeal: -0.01,
  planningTrip: false,
  requireCurbRamps: true,
  routeResult: null,
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
};

export const defaultLog = {
  bounds: null,
};

export const defaultMap = {
  selectedFeature: null,
  contextClick: null,
};

export const defaultGeolocation = {
  geolocation: null,
};

export const defaultMode = null;

export const defaultBrowser = {
  mediaType: null,
};
