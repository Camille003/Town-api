const express = require('express')

const weatherRoutes = require("./routers/weather");
const restaurantRoutes = require("./routers/restaurant");

const app = express();

app.use(express.json());

// app.use(weatherRoutes);
// app.use(restaurantRoutes);

module.exports = app;

