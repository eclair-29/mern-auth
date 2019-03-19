import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const Profile = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="profile wrapper">
      Redirected to profile, you are authenticated
    </div>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Profile;
