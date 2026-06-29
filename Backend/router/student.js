const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register / Add new student
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const student = new Student({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      password: hashedPassword
    });

    await student.save();
    res.send("Student added successfully");
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

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // 🔑 Create token
    const jwt = require("jsonwebtoken");

    const token = jwt.sign(
      { id: student._id, email: student.email },
      "secretkey",
      { expiresIn: "30d" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } catch (err) {
    res.status(500).send(err);
  }
});

// Middleware to verify token
function auth(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

// Protected route
router.get("/profile", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update profile
router.put("/update-profile", auth, async (req, res) => {
  try {

    const updatedStudent = await Student.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json(updatedStudent);

  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;