const mongoose = require("mongoose");

// Initialize schema
const NewSchema = mongoose.Schema;

// Profile schema embedded to a user
const ProfileSchema = new NewSchema({
  avatar: String,
  display_name: String
});

// Create User scehema
const UserSchema = new NewSchema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true, minlength: 10, maxlength: 100 },
  profile: ProfileSchema,
  registered_date: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model("user", UserSchema);
module.exports = User;
