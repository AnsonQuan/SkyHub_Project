var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var amadeus = require("amadeus");
var mongoose = require("mongoose");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

const uri = process.env.MONGODB_URI; // Get MongoDB URI from environment variables

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const Amadeus = new amadeus({
  clientId: process.env.AMADEUS_APIKEY,
  clientSecret: process.env.AMADEUS_APISECRET,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var contactRouter = require('./routes/contact');
var trackingRouter = require("./routes/tracking");
const reviewRoutes = require('./routes/review');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/track", trackingRouter);
app.use("/submit", contactRouter);
app.use("/review", reviewRoutes); // Add the review routes here

app.get("/", (req, res) => {
  res.render("flightSearch");
});

app.get("/city-and-airport-search/:parameter", (req, res) => {
  const parameter = req.params.parameter;
  // Which cities or airports start with the parameter variable
  Amadeus.referenceData.locations
    .get({
      keyword: parameter,
      subType: Amadeus.location.any,
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.get("/flight-search", (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;
  // Find the cheapest flights
  Amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: dateOfDeparture,
      adults: "1",
      max: "7",
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.post("/flight-confirmation", (req, res) => {
  const flight = req.body.flight;
  // Confirm availability and price
  Amadeus.shopping.flightOffers.pricing
    .post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flight],
        },
      })
    )
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var amadeus = require("amadeus");
var mongoose = require("mongoose");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

const uri = process.env.MONGODB_URI; // Get MongoDB URI from environment variables

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const Amadeus = new amadeus({
  clientId: process.env.AMADEUS_APIKEY,
  clientSecret: process.env.AMADEUS_APISECRET,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var contactRouter = require('./routes/contact');
var trackingRouter = require("./routes/tracking");
const reviewRoutes = require('./routes/review');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/track", trackingRouter);
app.use("/submit", contactRouter);
app.use("/review", reviewRoutes); // Add the review routes here

app.get("/", (req, res) => {
  res.render("flightSearch");
});

app.get("/city-and-airport-search/:parameter", (req, res) => {
  const parameter = req.params.parameter;
  // Which cities or airports start with the parameter variable
  Amadeus.referenceData.locations
    .get({
      keyword: parameter,
      subType: Amadeus.location.any,
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.get("/flight-search", (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;
  // Find the cheapest flights
  Amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: dateOfDeparture,
      adults: "1",
      max: "7",
    })
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

app.post("/flight-confirmation", (req, res) => {
  const flight = req.body.flight;
  // Confirm availability and price
  Amadeus.shopping.flightOffers.pricing
    .post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: [flight],
        },
      })
    )
    .then(function (response) {
      res.send(response.result);
    })
    .catch(function (response) {
      res.send(response);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
