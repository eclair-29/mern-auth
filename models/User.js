const mongoose = require("mongoose");

// Initialize schema
const NewSchema = mongoose.Schema;

// Create User scehema
const UserSchema = new NewSchema({
  email: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  password: { type: String, required: true, minlength: 10, maxlength: 100 },
  reg_date: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model("user", UserSchema);
module.exports = User;
