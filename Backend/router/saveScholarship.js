const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const SaveScholarship = require("../models/SaveScholarship");

// SAVE SCHOLARSHIP
router.post("/", async (req, res) => {
  try {
    // GET TOKEN
    const authHeader = req.headers.authorization;

    // CHECK TOKEN
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // REMOVE Bearer
    const token = authHeader.split(" ")[1];

    // VERIFY TOKEN
    const verified = jwt.verify(token, "secretkey");

    // FIX: handle all possible token formats
    const userId = verified.userId || verified.id || verified._id;

    // CHECK SCHOLARSHIP ID
    if (!req.body.scholarshipId) {
      return res.status(400).json({
        message: "Scholarship ID required",
      });
    }

    // CHECK ALREADY SAVED
    const alreadySaved = await SaveScholarship.findOne({
      user: userId,
      scholarship: req.body.scholarshipId,
    });

    if (alreadySaved) {
      return res.status(400).json({
        message: "Scholarship already saved",
      });
    }

    // CREATE SAVE
    const saved = new SaveScholarship({
      user: userId,
      scholarship: req.body.scholarshipId,
    });

    const result = await saved.save();

console.log("DATABASE SAVED:", result);

    res.status(201).json({
      message: "Scholarship Saved Successfully",
    });
  

  } catch (error) {
  console.log("SAVE ERROR TYPE:", error.name);
  console.log("SAVE ERROR MESSAGE:", error.message);

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired, please login again" });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token, please login again" });
  }

  res.status(500).json({
    message: error.message,
  });
}
});

module.exports = router;