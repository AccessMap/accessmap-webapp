export const mainTours = {
  desktop: [
    {
      target: "#search-geocoder",
      content: "Search for locations",
      placement: "right",
      disableBeacon: true
    },
    {
      target: ".directions-button",
      content: "Get directions",
      placement: "right"
    },
    {
      target: ".profiles-container",
      content: "Switch between travel modes",
      placement: "right"
    },
    {
      target: ".profile-editor-desktop",
      content: "Edit current travel mode",
      placement: "right"
    }
  ],
  mobile: [
    {
      target: "#search-geocoder",
      content: "Search for locations",
      placement: "bottom",
      disableBeacon: true
    },
    {
      target: ".directions-button",
      content: "Get directions",
      placement: "bottom"
    },
    {
      target: ".profiles-container",
      content: "Switch between travel modes",
      placement: "bottom"
    },
    {
      target: ".edit-profile-button",
      content: "Edit current travel mode",
      placement: "bottom"
    }
  ]
};

export const directionsTours = {
  desktop: [
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
    },
    {
      target: ".profiles-container",
      content: "Switch between travel modes",
      placement: "right"
    },
    {
      target: ".profile-editor-desktop",
      content: "Edit current travel mode",
      placement: "right"
    },
    {
      target: ".timepicker",
      content: "Change the time and date of departure",
      placement: "right"
    }
  ],
  mobile: [
    {
      target: "#origin-geocoder",
      content: "Search for start location",
      placement: "bottom",
      disableBeacon: true
    },
    {
      target: "#destination-geocoder",
      content: "Search for end location",
      placement: "bottom",
      disableBeacon: true
    },
    {
      target: ".profiles-container",
      content: "Switch between travel modes",
      placement: "bottom"
    },
    {
      target: ".edit-profile-button",
      content: "Edit current travel mode",
      placement: "bottom"
    },
    {
      target: ".trip-options-collapser",
      content: "Show or hide additional trip options",
      placement: "bottom"
    },
    {
      target: ".timepicker",
      content: "Edit the time and date of departure",
      placement: "bottom"
    }
  ]
};
