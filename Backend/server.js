const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const saveScholarshipRoutes =
require("./router/saveScholarship");

const universityRoutes =
require("./router/universities");

// const userRoutes = require("./router/users");

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/save-scholarship", saveScholarshipRoutes);
app.use("/api/universities", universityRoutes);

// app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/EMA-studygate")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const adminRoutes = require("./router/admin");

// Student Routes
const studentRoutes = require("./router/student");
app.use("/api/students", studentRoutes);

// Scholarship Routes
const scholarshipRouter = require("./router/scholarships");
app.use("/api/scholarships", scholarshipRouter);
// Admin Routes
app.use("/api/admin", adminRoutes);
//stats routes




// Start Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});