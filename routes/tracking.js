const express = require("express");
const router = express.Router();
const axios = require("axios");

// Define the base URL for the Sky Scanner API
const BASE_URL = "https://sky-scanner3.p.rapidapi.com";

// Set the required headers for making requests to the API
const headers = {
  "x-rapidapi-host": "sky-scanner3.p.rapidapi.com",
  "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Your RapidAPI key stored in environment variable
};

// Define routes

module.exports = router;
