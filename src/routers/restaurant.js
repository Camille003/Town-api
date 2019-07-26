const express  = require("express");
const {query,param} = require("express-validator")

const restaurantController = require("../controllers/restaurant");
const getCordinates = require("../middleware/coordinates");

const router = express.Router();

router.get("/restaurants/towns/id",
 getCordinates,
 restaurantController.getTownId)

router.get("/restaurants/categories",
getCordinates,
restaurantController.getCategories)

router.get("/restaurants/cuisines",
query('id').toInt().isNumeric(),
getCordinates,
restaurantController.getCuisines)


router.get("/restaurants/search",
getCordinates,
restaurantController.searchForLocation)

router.get("/restaurants/restaurant/:res_id",
getCordinates,
param('res_id').toInt().isNumeric(),
restaurantController.getRestaurant)

router.get("/restaurants/restaurant/:res_id/reviews",
getCordinates,
param('res_id').toInt().isNumeric(),
restaurantController.getRestaurantReviews)





module.exports = router;