import { DIVISOR, INCLINE_IDEAL } from "constants/routing";

const findK = (g, m, n) => Math.log(n) / Math.abs(g - m);

const estimateSpeed = (incline, uphillMax, downhillMax, speedMax) => {
  // Tobler's hiking function
  const tobler = (B, k, g, m) => B * Math.exp(-k * Math.abs(g - m));
  const inclineBound = incline > INCLINE_IDEAL ? uphillMax : downhillMax;
  const k = findK(inclineBound, INCLINE_IDEAL, DIVISOR);
  const speed = tobler(speedMax, k, incline, INCLINE_IDEAL);
  return speed;
};

const uphillSpeed = (incline, uphillMax, downhillMax, speedMax) => {
  return estimateSpeed(Math.abs(incline), uphillMax, downhillMax, speedMax);
};

const downhillSpeed = (incline, uphillMax, downhillMax, speedMax) => {
  return estimateSpeed(-Math.abs(incline), uphillMax, downhillMax, speedMax);
};

const inclineFromSpeed = (speed, uphillMax, downhillMax, speedMax, up) => {
  const B = speedMax;
  const inclineBound = up ? uphillMax : downhillMax;
  const k = findK(inclineBound, INCLINE_IDEAL, DIVISOR);
  const m = INCLINE_IDEAL;

  if (up) {
    return Math.log(speed / B) / -k + m;
  }

  return -1 * (Math.log(speed / B) / -k - m);
};

export { estimateSpeed, inclineFromSpeed, uphillSpeed, downhillSpeed };
