const mongoose = require("mongoose")

class HTTPError {
    constructor(statusCode, message) {
        this.statusCode = statusCode
    }
}

function errorHandler(fn) {
    return async function (req, res, next) {
        try {
            let result = await fn(req, res);
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}

function withTransactions(fn) {
    return async function (req, res, next) {
        try {
            let result
            await mongoose.connection.transaction(async session => {
                result = fn(req, res, session)
                res.json(result)
            })
            return result
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    HTTPError,
    withTransactions,
    errorHandler
}