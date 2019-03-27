const getTokenConfig = getState => {
  // Get token from localStorage
  const { token } = getState().auth;

  // Set request headers
  const config = {
    headers: { "Content-type": "application/json" }
  };

  // If a token exists, add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export default getTokenConfig;
