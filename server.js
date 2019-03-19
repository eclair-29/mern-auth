/* eslint-disable no-console */
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
