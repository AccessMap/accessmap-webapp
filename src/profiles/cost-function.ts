import { DIVISOR, INCLINE_IDEAL } from "constants/routing";

const findK = (g: number, m: number, n: number): number =>
  Math.log(n) / Math.abs(g - m);

const estimateSpeed = (
  incline: number,
  uphillMax: number,
  downhillMax: number,
  speedMax: number
): number => {
  // Tobler's hiking function
  const tobler = (B, k, g, m) => B * Math.exp(-k * Math.abs(g - m));
  const inclineBound = incline > INCLINE_IDEAL ? uphillMax : downhillMax;
  const k = findK(inclineBound, INCLINE_IDEAL, DIVISOR);
  const speed = tobler(speedMax, k, incline, INCLINE_IDEAL);
  return speed;
};

const uphillSpeed = (
  incline: number,
  uphillMax: number,
  downhillMax: number,
  speedMax: number
): number => {
  return estimateSpeed(Math.abs(incline), uphillMax, downhillMax, speedMax);
};

const downhillSpeed = (
  incline: number,
  uphillMax: number,
  downhillMax: number,
  speedMax: number
): number => {
  return estimateSpeed(-Math.abs(incline), uphillMax, downhillMax, speedMax);
};

const inclineFromSpeed = (
  speed: number,
  uphillMax: number,
  downhillMax: number,
  speedMax: number,
  up: boolean
): number => {
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
