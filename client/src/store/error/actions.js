import errorTypes from "./types";

// Return errors
const fetchErrors = (msg, status, id = null) => ({
  type: errorTypes.FETCH_ERROR,
  payload: { msg, status, id }
});

// Clear errors
const clearErrors = () => ({ type: errorTypes.FETCH_ERROR });

export default {
  fetchErrors,
  clearErrors
};
