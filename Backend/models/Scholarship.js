const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({

  // Basic Info
  name: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  flag: {
    type: String,
    default: "🌍",
  },

  // Scholarship Details
  amount: {
    type: String,
  },

  deadline: {
    type: String,
  },

  type: {
    type: String,
  },

  level: {
    type: String,
  },

  tag: {
    type: String,
  },

  eligibility: {
    type: String,
  },

  link: {
    type: String,
    default: "https://example.com",
  },

  // NEW FIELDS FROM ADMIN FORM
  minGpa: {
    type: String,
  },

  minIelts: {
    type: String,
  },

  description: {
    type: String,
  },

  degreeLevel: {
    type: String,
  },

  // Levels Object
  levels: {

    bachelor: {
      type: Boolean,
      default: false,
    },

    master: {
      type: Boolean,
      default: false,
    },

    phd: {
      type: Boolean,
      default: false,
    },

    postgrad: {
      type: Boolean,
      default: false,
    }

  }

}, { timestamps: true });

module.exports = mongoose.model("Scholarship", scholarshipSchema);