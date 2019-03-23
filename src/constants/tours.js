const mainToolbarTour = [
  {
    target: "#main-menu",
    content: "Get more information and change privacy settings.",
    placement: "bottom",
    disableBeacon: true
  },
  {
    target: ".region-selection-open-button",
    content: "Switch between different regions supported by AccessMap.",
    placement: "bottom"
  },
  {
    target: ".login",
    content: "Sign in or create an account.",
    placement: "bottom"
  }
];

const searchGeocoderTour = [
  {
    target: "#search-geocoder",
    content: "Search for locations",
    placement: "right"
  },
  {
    target: ".directions-button",
    content: "Get directions",
    placement: "right"
  }
];

const directionsGeocodersTour = [
  {
    target: "#origin-geocoder",
    content: "Search for start location",
    placement: "right",
    disableBeacon: true
  },
  {
    target: "#destination-geocoder",
    content: "Search for end location",
    placement: "right",
    disableBeacon: true
  }
];

const profileBarTour = [
  {
    target: ".profiles-container",
    content: "Switch between travel modes",
    placement: "right"
  },
  {
    target: ".edit-profile-button",
    content: "Edit current travel mode",
    placement: "bottom"
  },
  // Directions mode
  {
    target: ".trip-options-collapser",
    content: "Show or hide additional trip options",
    placement: "bottom"
  }
];

const profileEditingTour = [
  {
    target: ".profile-editor-desktop",
    content: "Edit current travel mode",
    placement: "right"
  }
  // Note: does not apply to mobile - can't get to a tour from profile editing view
];

const tripOptionsTour = [
  {
    target: ".timepicker",
    content: "Change the time and date of departure",
    placement: "right"
  }
];

const rightFABsTour = [
  {
    target: ".mapinfo-btn",
    content: "View map legend and information",
    placement: "left"
  },
  {
    target: ".floating-buttons",
    content: "Zoom the map in or out or zoom to your location",
    placement: "left"
  }
];

const mainTour = [
  ...mainToolbarTour,
  ...searchGeocoderTour,
  ...directionsGeocodersTour,
  ...profileBarTour,
  ...profileEditingTour,
  ...tripOptionsTour,
  ...rightFABsTour
];

const mobileDirectionsTour = [
  ...directionsGeocodersTour,
  ...profileBarTour,
  ...profileEditingTour,
  ...tripOptionsTour,
  ...rightFABsTour
];

export { mainTour, mobileDirectionsTour };
