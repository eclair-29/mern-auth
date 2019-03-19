import { connect } from "react-redux";
import { storeOperations } from "../../store";

import Register from "./Register";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  registerUser: ({ fname, lname, email, password }) => {
    const newUser = { fname, lname, email, password };
    dispatch(storeOperations.registerUser(newUser));
  }
});

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default NavBarContainer;
