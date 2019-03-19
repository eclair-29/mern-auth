import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import { storeOperations } from "../../store";
import NavBar from "./NavBar";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(storeOperations.logoutUser())
});

const NavBarContainer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(NavBar);

export default NavBarContainer;
