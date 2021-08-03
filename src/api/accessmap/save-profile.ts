import { Profile } from "profiles/profiles";

const saveProfile = async (
  profile: Profile,
  accessToken: string
): Promise<void> => {
  // Retrieve user's profile
  const response = await fetch("/api/v1/profiles", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uphill_max: profile.uphillMax,
      downhill_max: profile.downhillMax,
      avoid_curbs: profile.avoidCurbs,
    }),
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  return;
};

export default saveProfile;
