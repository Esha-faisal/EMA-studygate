const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  countryInterested: String,
  degreeLevel: String,
  ieltsScore: Number,
  applicationStatus: String
});

module.exports = mongoose.model("User", userSchema);