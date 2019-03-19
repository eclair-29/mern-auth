const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User model
const User = require("../../models/User");

// Initialized router
const router = express.Router();

// route:         POST /api/v.1/users
// description:   Register new user from db
// access:        public
router.post("/", (req, res) => {
  const { email, fname, lname, password } = req.body;

  // Validate required fields
  if (!email || !fname || !lname || !password)
    return res
      .status(400)
      .json({ msg: "Please enter all the required fields" });

  // Check for existing user (email)
  const checkExistingUser = () => {
    return User.findOne({ email }).then(user => {
      if (user) res.status(400).json({ msg: "User is already exists" });
      return user;
    });
  };

  // If user entered a unique email, then
  // Create new user from the db and encrypt the plain text password, then
  // Save the new user to the db together with a json web token
  const createNewUser = () => {
    // Create new user
    const newUser = new User({ fname, lname, email, password });

    // Generate salt and hash the new user password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        saveUser();
      });
    });

    // Save new user from the db after password encryption
    const saveUser = () => {
      return newUser.save().then(user => getRes(user));
    };

    // Get server response and token upon saving as doc
    const getRes = user => {
      const userRes = {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        id: user.id
      };

      const payload = { id: user.id, email: user.email };
      const secret = config.get("jwtSecret");
      const expiry = { expiresIn: 3600 };

      const callback = (err, token) => {
        if (err) throw err;
        res.json({ token, user: userRes });
      };

      return jwt.sign(payload, secret, expiry, callback);
    };
  };

  return checkExistingUser().then(createNewUser);
});

module.exports = router;
