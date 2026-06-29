const mongoose = require("mongoose");

const saveScholarshipSchema = new mongoose.Schema({

  user: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"

  },

  scholarship: {

    type: mongoose.Schema.Types.ObjectId,
    ref: "Scholarship"

  }

});

module.exports = mongoose.model(
  "SaveScholarship",
  saveScholarshipSchema
);