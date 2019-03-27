const mongoose = require("mongoose");

// Initialize schema
const NewSchema = mongoose.Schema;

// Profile schema embedded to a user
const ProfileSchema = new NewSchema({
  _id: false,
  avatar: String,
  name: String
});

// Timestamp realted to user
const TimestampSchema = new NewSchema({
  _id: false,
  reg_date: { type: Date, default: Date.now },
  mod_date: Date
});

// Create User scehema
const UserSchema = new NewSchema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true, minlength: 10, maxlength: 100 },
  profile: ProfileSchema,
  timestamps: TimestampSchema
});

// Create model
const User = mongoose.model("user", UserSchema);
module.exports = User;
