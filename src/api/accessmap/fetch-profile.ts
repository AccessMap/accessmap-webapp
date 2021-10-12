import { SyncableProfile } from "profiles/profiles";

// Load a user's routing profile
const fetchProfile = async (accessToken: string): Promise<SyncableProfile> => {
  // Retrieve user's profile
  const response = await fetch("/api/v1/profiles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  const { profiles } = await response.json();
  const profile = profiles[0];
  return {
    uphillMax: profile.uphill_max,
    downhillMax: profile.downhill_max,
    avoidCurbs: profile.avoid_curbs,
    streetAvoidance: profile.streetAvoidance,
  };
};

export default fetchProfile;
