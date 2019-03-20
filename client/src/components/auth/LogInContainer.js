import { connect } from "react-redux";
import { storeOperations } from "../../store";

import LogIn from "./LogIn";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  loginUser: ({ email, password }) => {
    const newUser = { email, password };
    dispatch(storeOperations.loginUser(newUser));
  }
});

const LogInContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

export default LogInContainer;
