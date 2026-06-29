const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,

  // AUTH
  fullName: {
    type: String,
    default: "",
  },

  firstName: {
    type: String,
    default: "",
  },

  lastName: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // PROFILE
  country: {
    type: String,
    default: "",
  },

  degreeLevel: {
    type: String,
    default: "",
  },

  fieldOfStudy: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
    default: "",
  },

  dob: {
    type: String,
    default: "",
  },

  gender: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  bio: {
    type: String,
    default: "",
  },

  // ACADEMIC
  currentGpa: {
    type: String,
    default: "",
  },

  targetCountry: {
    type: String,
    default: "",
  },

  intakeSemester: {
    type: String,
    default: "",
  },

  budget: {
    type: String,
    default: "",
  },

  ieltsScore: {
    type: Number,
    default: 0,
  },

  applicationStatus: {
    type: String,
    default: "Planning",
  },

  // SAVED UNIVERSITIES
  savedUniversities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model("Student", studentSchema);