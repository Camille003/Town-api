const express  = require("express");
const {query,param} = require("express-validator")
const router = express.Router();

const mappingControllers = require("../controllers/towns")

router.get("/towns"
,
query('place').trim().isString().isLength({min:2})
,
mappingControllers.getTowns)


router.get("/coordinates/:place"
,
param('place').trim().isString().isLength({min:2})
,
mappingControllers.getCoordinates)

module.exports = router;