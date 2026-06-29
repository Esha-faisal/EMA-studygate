const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect("mongodb://localhost:27017/EMA-studygate");

const createAdmin = async () => {

  const hashedPassword = await bcrypt.hash(
    "admin123",
    10
  );

  const admin = new Admin({

    email: "admin@gmail.com",

    password: hashedPassword

  });

  await admin.save();

  console.log("Admin Created");

  process.exit();

};

createAdmin();