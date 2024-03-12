var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");


function isAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    const redirectTo = encodeURIComponent(req.originalUrl);
    return res.redirect(`/login?redirectTo=${redirectTo}`);
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      const redirectTo = encodeURIComponent(req.originalUrl);
      return res.redirect(`/login?redirectTo=${redirectTo}`);
    }
    req.user = decoded;
    next();
  });
}

/* GET Home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "SkyHub Website" });
});

/* GET About page. */
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Us" });
});

/* GET Contact page. */
router.get("/contact", isAuthenticated, function (req, res, next) {
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
