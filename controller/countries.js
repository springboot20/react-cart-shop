const { errorHandler } = require("../error/index.js")
const model = require("../model/index.js")
const countries = require("./countries.json")

const allCountries = errorHandler(async (req, res, next) => {
    const countryDoc = await model.Country.insertMany(countries)

    return countryDoc
})

modules.exports = allCountries