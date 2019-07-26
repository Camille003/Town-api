const express = require('express')

const mapRoutes = require("./routers/geocoding");
const restaurantRoutes = require("./routers/restaurant");
const weatherRoutes = require("./routers/weather");

const app = express();

app.use(express.json());

app.use(mapRoutes);
app.use(weatherRoutes);
app.use(restaurantRoutes);

module.exports = app;

