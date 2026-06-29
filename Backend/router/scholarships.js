const express = require("express");

const router = express.Router();

const Scholarship = require("../models/Scholarship");


// ==========================
// GET ALL SCHOLARSHIPS
// ==========================
router.get("/", async (req, res) => {

  try {

    const scholarships = await Scholarship.find();

    res.status(200).json({
      scholarships
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error fetching scholarships"
    });

  }

});


// ==========================
// ADD SCHOLARSHIP
// ==========================
router.post("/", async (req, res) => {

  try {

    console.log(req.body);

    const newScholarship = new Scholarship(req.body);

    await newScholarship.save();

    res.status(201).json({
      message: "Scholarship added successfully",
      scholarship: newScholarship
    });

  } catch (error) {

    console.log("FULL ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

});


// ==========================
// DELETE SCHOLARSHIP
// ==========================
router.delete("/:id", async (req, res) => {

  try {

    await Scholarship.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Scholarship deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error deleting scholarship"
    });

  }

});


// ==========================
// UPDATE SCHOLARSHIP
// ==========================
router.put("/:id", async (req, res) => {

  try {

    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship: updatedScholarship
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error updating scholarship"
    });

  }

});

module.exports = router;