const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  deleted: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;