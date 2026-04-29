const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // student / faculty
});

module.exports = mongoose.model("User", userSchema);