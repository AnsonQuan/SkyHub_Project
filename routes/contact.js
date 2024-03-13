const express = require("express");
const router = express.Router();
const CustomerSupport = require("../models/customerSupport");


router.post("/", async (req, res) => {
    const { title, content, email } = req.body;
  try {
    // Create a new CS request 
    const newCS = new CustomerSupport({
      title,
      content,
      email
    });
    await newCS.save();

    res.redirect("/contact");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
