import { RouteResult } from "types";
import { Profile } from "profiles/profiles";
import { Waypoint } from "features/waypoints/waypoints-slice";
import { TripOptionsState } from "features/trip-options/trip-options-slice";

export interface DirectionsOptions {
  origin: Waypoint;
  destination: Waypoint;
  profile: Profile;
  tripOptions: TripOptionsState;
  signal?: AbortSignal;
}

const fetchDirections = async (
  options: DirectionsOptions
): Promise<RouteResult> => {
  const { origin, destination, profile, tripOptions } = options;

  const {
    uphillMax,
    downhillMax,
    avoidCurbs,
    streetAvoidance,
    id: profileID,
  } = profile;

  const { dateTime: timeStamp } = tripOptions;

  const routeParams = {
    lon1: origin.lon,
    lat1: origin.lat,
    lon2: destination.lon,
    lat2: destination.lat,
    uphill: uphillMax,
    downhill: Math.abs(downhillMax),
    avoidCurbs: avoidCurbs ? 1 : 0,
    streetAvoidance: streetAvoidance,
    timestamp: timeStamp,
  };

  const esc = encodeURIComponent;
  const urlQuery = Object.keys(routeParams)
    .map((k) => `${esc(k)}=${esc(routeParams[k])}`)
    .join("&");

  const query = `${window.location.origin}/api/v1/routing/directions/${profileID}.json?${urlQuery}`;

  let fetchOptions: object;
  if (options.signal !== undefined) {
    fetchOptions = { signal: options.signal };
  } else {
    fetchOptions = {};
  }

  const response = await fetch(query, fetchOptions);

  if (!response.ok) {
    // TODO: give a helpful message back instead of the error status
    return { code: "Error", message: `HTTP Error: ${response.status}` };
  }

  const routeResult = await response.json();
  return routeResult;
};

export default fetchDirections;
