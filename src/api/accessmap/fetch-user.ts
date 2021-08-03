// Fetch a user's account profile

interface AccessMapUser {
  userID: string;
  displayName: string;
}

const fetchUser = async (accessToken: string): Promise<AccessMapUser> => {
  // Retrieve user's profile
  const response = await fetch("/api/v1/user/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  const { user_id, display_name } = await response.json();
  return { userID: user_id, displayName: display_name };
};

export default fetchUser;
