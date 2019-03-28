import { connect } from "react-redux";

import { authOperations } from "../../store";
import Profile from "./Profile";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(authOperations.loadUser())
});

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default ProfileContainer;
