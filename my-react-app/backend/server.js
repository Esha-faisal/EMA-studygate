const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const User = require("./models/User");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Community Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend is running with MongoDB Community");
});

app.post("/add-user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User saved successfully");
  } catch (error) {
    res.status(500).send("Error saving user");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
