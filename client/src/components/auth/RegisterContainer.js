import { connect } from "react-redux";
import { authOperations } from "../../store";

import Register from "./Register";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  registerUser: ({ fname, lname, email, password }) => {
    const newUser = { fname, lname, email, password };
    dispatch(authOperations.registerUser(newUser));
  }
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
