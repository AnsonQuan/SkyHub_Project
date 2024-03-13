// Desc: User routes
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken"); // importing 'jsonwebtoken' package (but if it is unnecessary, [;ease delete this one)
const User = require("../models/user");

// User login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // If user not found or password doesn't match
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If login successful, generate JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");
    res.cookie("token", token, { httpOnly: true });
    // redirect to the home page after successfully
    res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User registration route
router.post("/register", async (req, res) => {
  const { firstName, lastName, address, phoneNumber, email, password } =
    req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      address,
      phoneNumber,
      email,
      password,
    });
    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
