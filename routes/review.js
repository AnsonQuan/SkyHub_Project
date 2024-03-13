// routes/reviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.post("/submit-review", async (req, res) => {
    const { overallRating, userReview, improvements, recommendation, suggestions } = req.body;
    try {
        const newReview = new Review({
            overallRating,
            userReview,
            improvements,
            recommendation,
            suggestions
        });
        await newReview.save();
        res.redirect("/thank-you"); // Redirect to a thank you page or any other appropriate page
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;// routes/reviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.post("/submit-review", async (req, res) => {
    const { overallRating, userReview, improvements, recommendation, suggestions } = req.body;
    try {
        const newReview = new Review({
            overallRating,
            userReview,
            improvements,
            recommendation,
            suggestions
        });
        await newReview.save();
        res.redirect("/thank-you"); // Redirect to a thank you page or any other appropriate page
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
