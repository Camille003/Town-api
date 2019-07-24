const express = require('express')

const weatherRoutes = require("./routes/weather");
const restaurantRoutes = require("./routes/restaurant");

const app = express();

app.use(express.json());

app.use(weatherRoutes);
app.use(restaurantRoutes);

module.exports = app;

