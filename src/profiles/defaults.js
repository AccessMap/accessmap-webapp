export default {
  Wheelchair: {
    label: "Manual wheelchair",
    icon: "wheelchair",
    speed: 0.8,
    inclineMax: 0.08,
    inclineMin: -0.1,
    avoidCurbs: true
  },
  Powered: {
    label: "Powered wheelchair",
    icon: "wheelchair-powered",
    speed: 2,
    inclineMax: 0.12,
    inclineMin: -0.12,
    avoidCurbs: true
  },
  Cane: {
    label: "Walk / Cane User",
    speed: 1,
    icon: "cane-user",
    inclineMax: 0.14,
    inclineMin: -0.14,
    avoidCurbs: false
  }
};
