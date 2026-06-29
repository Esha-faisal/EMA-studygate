const express = require("express");
const router = express.Router();

const University = require("../models/universities");
const adminMiddleware =
require("../middleware/adminMiddleware");


// GET ALL UNIVERSITIES
router.get("/", async (req, res) => {
  try {

    const universities = await University.find();
    res.json(universities);

  } catch (error) {

    console.log("FULL ERROR:", error);
    console.log("ERROR MESSAGE:", error.message);

    res.status(500).json({
      message: error.message,
    });

  }
});


// ADD UNIVERSITY
router.post("/", adminMiddleware, async (req, res) => {
  try {

    const newUniversity = new University({
      universityName: req.body.universityName,
      country: req.body.country,
      qsRanking: req.body.qsRanking,
      annualTuition: req.body.annualTuition,
      programs: req.body.programs,
      applicationDeadline: req.body.applicationDeadline,
      status: req.body.status,
    });

    const savedUniversity = await newUniversity.save();
    res.status(201).json(savedUniversity);

  } catch (error) {

    console.log(error);
    res.status(500).json({
      message: error.message,
    });

  }
});


// UPDATE UNIVERSITY
router.put("/:id", adminMiddleware, async (req, res) => {
  try {

    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUniversity);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// DELETE UNIVERSITY
router.delete("/:id", adminMiddleware, async (req, res) => {
  try {

    await University.findByIdAndDelete(req.params.id);
    res.json({ message: "University deleted" });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


module.exports = router;