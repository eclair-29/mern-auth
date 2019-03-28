import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { authReducer, authActions } from "./auth";
import { errorReducer } from "./error";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer
});

// Redux store
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// if there is a proper token in user browser/local storage
// dispatch an action that sets isAuthenticated to true
const token = localStorage.getItem("token");

if (token) {
  store.dispatch(authActions.autoAuth());
}

export default store;
export { authOperations, authActions } from "./auth";
export { errorActions } from "./error";
