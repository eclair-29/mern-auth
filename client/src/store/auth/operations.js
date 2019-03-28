import axios from "axios";

import authActions from "./actions";
import { errorActions } from "../error";
import getTokenConfig from "../../helpers/authHeader";

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

// Log In user
const loginUser = ({ email, password }) => dispatch => {
  // Preload state
  dispatch(authActions.requestPreLoading());

  // Headers
  const config = {
    headers: { "Content-type": "application/json" }
  };

  // Post request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/v.1/auth", body, config)
    .then(res => {
      dispatch(authActions.loginUser(res.data));
    })
    .catch(err => {
      const { data, status } = err.response;

      dispatch(errorActions.fetchErrors(data, status, "LOGIN_FAIL"));
      dispatch(authActions.getLoginErrpr());
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
  loginUser,
  logoutUser
};
