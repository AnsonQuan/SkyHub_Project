var express = require("express");
var router = express.Router();

/* GET Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "SkyHub Website" });
});

/* GET About page. */
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us" });
});

/* GET Flights page. */
router.get("/flight", function (req, res, next) {
  res.render("flight", { title: "Search Flights" }); 
});


/* GET Contact page. */
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Us" });
});

/* GET Register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

/* GET Login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* GET Login page. */
router.get("/track", function (req, res, next) {
  res.render("track", { title: "Track a Flight" });
});

module.exports = router;
