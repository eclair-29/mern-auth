import axios from "axios";

import { authActions, errorActions } from "../actions";

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

// Check for a token and load user
const loadUser = () => (dispatch, getState) => {
  // Preload state
  dispatch(authActions.requestPreLoading());

  // Load a user
  axios
    .get("/api/v.1/auth/user", getTokenConfig(getState))
    .then(res => {
      dispatch(authActions.loadUser(res.data));
    })
    .catch(err => {
      const { data, status } = err.response;

      dispatch(errorActions.fetchErrors(data, status));
      dispatch(authActions.getAuthError());
    });
};

export default {
  loadUser,
  getTokenConfig
};
