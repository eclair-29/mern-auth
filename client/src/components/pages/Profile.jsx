/* eslint-disable react/forbid-prop-types */
import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class Profile extends React.Component {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    const { isAuthenticated, user } = this.props;

    if (!isAuthenticated) return <Redirect to="/login" />;

    return user ? (
      <div className="profile wrapper">
        Thank you for signing up,
        <span>{`${user.fname} ${user.lname}`}</span>
      </div>
    ) : null;
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
};

Profile.defaultProps = {
  user: null
};

export default Profile;
