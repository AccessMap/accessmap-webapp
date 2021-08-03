import fetchDirections, { DirectionsOptions } from "./fetch-directions";

export interface SignaledDirectionsOptions extends DirectionsOptions {
  signal: AbortSignal;
}

const wrapped = (f) => {
  let controller: AbortController = null;

  return (options: SignaledDirectionsOptions) => {
    if (controller !== null) {
      controller.abort();
    }
    controller = new AbortController();
    options.signal = controller.signal;
    return f(options).finally(() => {
      controller = null;
    });
  };
};

const selfCancelingFetchDirections = wrapped(fetchDirections);

export default selfCancelingFetchDirections;
