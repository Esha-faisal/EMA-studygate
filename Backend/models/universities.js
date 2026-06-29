const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({

  universityName: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  qsRanking: {
    type: Number,
    required: true
  },

  annualTuition: {
    type: String
  },

  programs: {
    type: [String]
  },

  applicationDeadline: {
    type: String
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },

flag: {
  type: String,
  default: "🎓"
},

acceptance: {
  type: String,
  default: "N/A"
},

type: {
  type: String,
  default: "Public"
},

tag: {
  type: String,
  default: "Popular"
},

website: {
  type: String,
  default: "#"
}

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "University",
  universitySchema
);