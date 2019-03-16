import { errorTypes } from "../types";

const initialState = {
  msg: "",
  status: null,
  id: null
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorTypes.FETCH_ERROR:
      return {
        msg: action.payload,
        status: action.payload.status,
        id: action.payload.id
      };

    case errorTypes.CLEAR_ERROR:
      return {
        msg: "",
        status: null,
        id: null
      };

    default:
      return state;
  }
};

export default errorReducer;
