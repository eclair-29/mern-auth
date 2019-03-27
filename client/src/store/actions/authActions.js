import { authTypes } from "../types";

// Preloading before fetching a user
const requestPreLoading = () => ({ type: authTypes.USER_LOADING });

// Auto auth user
const autoAuth = () => ({ type: authTypes.AUTO_AUTH });

// Load a user
const loadUser = payload => ({
  type: authTypes.USER_LOADED,
  payload
});

// Fetch authenticated user data + token
const loginUser = payload => ({
  type: authTypes.LOGIN_SUCCESS,
  payload
});

// Fetch registered user data + token
const registerUser = payload => ({
  type: authTypes.REGISTER_SUCCESS,
  payload
});

const getAuthError = () => ({ type: authTypes.AUTH_ERROR });
const getLoginErrpr = () => ({ type: authTypes.LOGIN_FAIL });
const getRegistrationError = () => ({ type: authTypes.REGISTER_FAIL });
const logoutUser = () => ({ type: authTypes.LOGOUT_SUCCESS });

export default {
  autoAuth,
  requestPreLoading,
  loadUser,
  loginUser,
  registerUser,
  getAuthError,
  getLoginErrpr,
  getRegistrationError,
  logoutUser
};
