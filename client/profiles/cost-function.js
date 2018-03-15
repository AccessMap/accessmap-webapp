import { DIVISOR, INCLINE_IDEAL } from 'constants/routing';

const findK = (g, m, n) => Math.log(n) / Math.abs(g - m);

const inclineCost = (incline, inclineMax, inclineMin, speedMax) => {
  // Tobler's hiking function
  const tobler = (B, k, g, m) => B * Math.exp(-k * Math.abs(g - m));

  const inclineBound = incline > INCLINE_IDEAL ? inclineMax : inclineMin;

  const k = findK(inclineBound, INCLINE_IDEAL, DIVISOR);
  const speed = tobler(speedMax, k, incline, INCLINE_IDEAL);
  const pace = 1 / speed;

  return pace;
};

const inclineFromSpeed = (speed, inclineMax, inclineMin, speedMax, up) => {
  const B = speedMax;
  const inclineBound = up ? inclineMax : inclineMin;
  const k = findK(inclineBound, INCLINE_IDEAL, DIVISOR);
  const m = INCLINE_IDEAL;

  if (up) {
    return (Math.log(speed / B) / -k) + m;
  }

  return -1 * ((Math.log(speed / B) / -k) - m);
};


export { inclineCost, inclineFromSpeed };
