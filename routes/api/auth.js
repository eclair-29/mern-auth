const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");

// User model
const User = require("../../models/User");

// Initialized router
const router = express.Router();

// route:         POST /api/v.1/auth
// description:   Authenticate user credentials
// access:        public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password)
    return res
      .status(400)
      .json({ msg: "Please enter all the required fields" });

  // Check for existing user (email)
  const checkExistingUser = () => {
    return User.findOne({ email }).then(user => {
      if (!user) res.status(400).json({ msg: "User does not exists" });
      return user;
    });
  };

  // If user entered an existing credentials, then
  // Match the password entered to the existing password from the db
  const validateCredentials = user => {
    // Compare passwords
    // If matched, send the server response together with a token
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) res.status(400).json({ msg: "Invalid user credentials" });
      getRes(user);
    });

    // Get server response and token if passwords are matched
    const getRes = () => {
      const userRes = {
        email: user.email,
        fname: user.fname,
        lname: user.lname,
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

  return checkExistingUser().then(validateCredentials);
});

// route:         GET /api/v.1/auth/user
// description:   Fetch user details
// access:        private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
