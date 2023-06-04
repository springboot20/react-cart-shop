const router = require("express").Router()
const allCountries = require("../controller/countries")

router.get("/", allCountries)

module.exports = router