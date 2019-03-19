import { authTypes } from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
  isLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case authTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false
      };

    case authTypes.LOGIN_SUCCESS:
    case authTypes.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case authTypes.AUTH_ERROR:
    case authTypes.LOGIN_FAIL:
    case authTypes.LOGOUT_SUCCESS:
    case authTypes.REGISTER_FAIL:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false
      };

    default:
      return state;
  }
};

export default authReducer;
