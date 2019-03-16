const config = require("config");
const jwt = require("jsonwebtoken");

// function to fetch the token that sent from the
// front end (react) and verify it
function auth(req, res, next) {
  const token = req.header("x-auth-token");
  const secret = config.get("jwtSecret");

  // Check for token
  if (!token) res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, secret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
