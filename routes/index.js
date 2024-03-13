var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require('../models/user');

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    const redirectTo = encodeURIComponent(req.originalUrl);
    return res.redirect(`/login?redirectTo=${redirectTo}`);
  }

  jwt.verify(token, 'your-secret-key', async (err, decoded) => {
    if (err) {
      const redirectTo = encodeURIComponent(req.originalUrl);
      return res.redirect(`/login?redirectTo=${redirectTo}`);
    }
    // Assuming the decoded token contains the user ID
    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        // Handle error or no user found
        return res.redirect('/login');
      }
      req.user = user; // Add the user to the request object
      next();
    } catch (error) {
      // Handle any errors that occur during fetching the user
      console.error("Error fetching user:", error);
      res.redirect('/login');
    }
  });
};

/* GET Home page. */
router.get("/", function (req, res, next) {
  console.log(req.user);
  const user = req.user || null;
  res.render("index", { title: "SkyHub Website", user: user });
});

/* GET About page. */
router.get("/about", isAuthenticated, function (req, res, next) {
  const user = req.user || null;
  res.render("about", { title: "About Us", user: user });
});

/* GET Contact page. */
router.get("/contact", isAuthenticated, function (req, res, next) {
  const user = req.user || null;
  res.render("contact", { title: "Contact Us", user: user });
});

/* GET Review page. */
router.get("/review",  function (req, res, next) {
  const user = req.user || null;
  res.render("review", { title: "Write a review", user: user  });
});

/* GET Register page. */
router.get("/register", function (req, res, next) {
  const user = req.user || null;
  res.render("register", { title: "Register", user:  user });
});

/* GET Login page. */
router.get("/login", function (req, res, next) {
  const user = req.user || null;
  res.render("login", { title: "Login", user: user });
});

/* GET Login page. */
router.get("/track", isAuthenticated,function (req, res, next) {
  const user = req.user || null;
  res.render("track", { title: "Track a Flight", user: user });
});

router.get('/logout', function(req, res) {
  res.clearCookie('token'); 
  res.redirect('/'); 
});

module.exports = router;
