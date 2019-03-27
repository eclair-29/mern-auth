import { combineReducers } from "redux";
import { authReducer, errorReducer } from "./reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer
});

export default rootReducer;
export { default as storeOperations } from "./operations";
export { authActions, errorActions } from "./actions";
