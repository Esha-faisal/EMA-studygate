content = """const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/student");

// Register / Add new student
router.post("/add", async (req, res) => {
  try {
    const student = new Student({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    await student.save();
    res.send("Student added successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Register student
router.post("/register", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send("Student registered successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err);
  }
});




// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).send("Student not found");
    }

    if (student.password !== password) {
      return res.status(400).send("Invalid password");
    }

    res.send("Login successful");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
"""

with open("Backend/router/student.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
