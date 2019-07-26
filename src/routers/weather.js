const express  = require("express");
const router = express.Router();

const isCoordinates = require("../middleware/coordinates")

const getWeatherForecast = require("../controllers/weather")

router.get('/forecast',isCoordinates,getWeatherForecast)

module.exports = router;