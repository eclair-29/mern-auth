import { connect } from "react-redux";

import { storeOperations } from "../../store";
import Profile from "./Profile";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(storeOperations.logoutUser())
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;