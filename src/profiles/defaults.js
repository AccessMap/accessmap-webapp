export default {
  Wheelchair: {
    label: "Manual wheelchair",
    icon: "wheelchair",
    speed: 0.8,
    uphillMax: 0.08,
    downhillMax: -0.1,
    avoidCurbs: true,
    tactilePaving: false
  },
  Powered: {
    label: "Powered wheelchair",
    icon: "wheelchair-powered",
    speed: 2,
    uphillMax: 0.12,
    downhillMax: -0.12,
    avoidCurbs: true,
    tactilePaving: false
  },
  Cane: {
    label: "Walk / Cane User",
    speed: 1,
    icon: "cane-user",
    uphillMax: 0.14,
    downhillMax: -0.14,
    avoidCurbs: false,
    tactilePaving: false
  }
};
