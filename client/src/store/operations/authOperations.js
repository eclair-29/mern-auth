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

// Register user operations
const registerUser = ({ fname, lname, email, password }) => dispatch => {
  // Preload state
  dispatch(authActions.requestPreLoading());

  // Headers
  const config = {
    headers: { "Content-type": "application/json" }
  };

  // Post request body
  const body = JSON.stringify({ fname, lname, email, password });

  axios
    .post("/api/v.1/users", body, config)
    .then(res => {
      dispatch(authActions.registerUser(res.data));
    })
    .catch(err => {
      const { data, status } = err.response;

      dispatch(errorActions.fetchErrors(data, status, "REGISTER_FAIL"));
      dispatch(authActions.getRegistrationError());
    });
};

// Logout user
const logoutUser = () => dispatch => {
  // Preload state
  dispatch(authActions.requestPreLoading());

  // Logout call to action
  dispatch(authActions.logoutUser());
};

export default {
  loadUser,
  registerUser,
  getTokenConfig,
  logoutUser
};
