import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavBar = ({ isAuthenticated, logoutUser }) => {
  const navLinks = isAuthenticated ? (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link onClick={() => logoutUser()} to="#">
      Logout
    </Link>
  ) : (
    <div className="signed-out-links">
      <NavLink exact to="/" activeClassName="active">
        Log In
      </NavLink>
      <NavLink to="/register" activeClassName="active">
        Sign Up
      </NavLink>
    </div>
  );

  return <nav className="navbar">{navLinks}</nav>;
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default NavBar;
