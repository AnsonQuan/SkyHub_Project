import express from "express";
import Amadeus from "amadeus";
import bodyParser from "body-parser";
import cors from "cors";

const router = express.Router();
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_APIKEY,
  clientSecret: process.env.AMADEUS_APISECRET,
});

router.use(bodyParser.json());
router.use(
  cors({
    origin: "http://localhost:4200",
  })
);

router.get(`/city-and-airport-search/:parameter`, (req, res) => {
  const parameter = req.params.parameter;
  amadeus.referenceData.locations
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

router.get(`/flight-search`, (req, res) => {
  const originCode = req.query.originCode;
  const destinationCode = req.query.destinationCode;
  const dateOfDeparture = req.query.dateOfDeparture;

  // Find the cheapest flights
  amadeus.shopping.flightOffersSearch
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

export default router;
