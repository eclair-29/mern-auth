/* eslint-disable no-console */

// Node/React Authentication Guidelines [USER REGISTRATION]
// 1. setup - POST /api/v.1/users route
// 2. declare registration input/request body (e.g. email, username, password)
// 3. validate required fields
// 4. check for existing user (find by: email or username)
// 5. create new user if theres is no existing email found
// 6. hash and encrypt new user password
// 7. save the user to the db
// 8. set server response and token upon saving as doc

// Node/React Authentication Guidelines [USER LOGIN]
// 1. setup - POST /api/v.1/auth route
// 2. declare login input/request body (e.g. email and password)
// 3. validate required fields
// 4. check for existing user (find by: email or username)
// 5. validate credentials and match passwords from the db and user input
// 6. set server response and token if credentials are passed and passwrods are matched

// Node/React Authentication Guidelines [AUTH MIDDLEWARE]
// 1. create a folder to store all the middlewares
// 2. create a file - auth.js at the middleware folder we just recently created
// 3. import the jwt secret at config and jwt library
// 4. create a function - auth
// 5. declare a request header for "x-auth-token"
// 6. check if there is a token living in the request header
// 7. verify the token if there is any

const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const auth = require("./routes/api/auth");
const users = require("./routes/api/users");

// Require DB config
const db = config.get("mongoURI");

// Initialize app
const app = express();

// Use express body parser middleware
app.use(express.json());

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch(err => console.log(err));

// Use API routes
app.use("/api/v.1/users", users);
app.use("/api/v.1/auth", auth);

// Serve static assets (build) if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen to a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`App is running & listening at port ${PORT}`)
);
