const fetchAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await fetch("/api/v1/auth/refresh", {
    method: "POST",
    headers: {
      Authorization: `Bearer  ${refreshToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(String(response.status));
  }

  const { access_token } = await response.json();

  return access_token;
};

export default fetchAccessToken;
