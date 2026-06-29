const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const User = require("../models/student");


// ==========================
// ADMIN LOGIN
// ==========================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK ADMIN
    const admin = await Admin.findOne({ email });

    if (!admin) {

      return res.status(404).json({
        message: "Admin not found"
      });

    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    // CREATE TOKEN
    const token = jwt.sign(

      {
        id: admin._id
      },

      "secretkey",

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      message: "Login Successful",
      token

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});



// ==========================
// GET ALL USERS
// ==========================
router.get("/", async (req, res) => {

  try {

    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error Fetching Users"
    });

  }

});



// ==========================
// DELETE USER
// ==========================
router.delete("/:id", async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User Deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error Deleting User"
    });

  }

});



module.exports = router;