export default {
  wheelchair: {
    name: 'wheelchair',
    label: 'Manual wheelchair',
    speed: 0.6,
    inclineMax: 0.08,
    inclineMin: -0.1,
    requireCurbRamps: true,
  },
  powered: {
    name: 'powered',
    label: 'Powered wheelchair',
    speed: 2,
    inclineMax: 0.12,
    inclineMin: -0.12,
    requireCurbRamps: true,
  },
  cane: {
    name: 'cane',
    label: 'Walk / Cane User',
    speed: 1.3,
    inclineMax: 0.14,
    inclineMin: -0.14,
    requireCurbRamps: false,
  },
};
