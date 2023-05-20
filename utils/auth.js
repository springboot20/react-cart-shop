const jwt = require("jsonwebtoken");
const { errorHandler, HTTPError } = require("../error");

const auth = errorHandler((req, res, next) => {
    const authHeader = req.header?.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token)
        throw new HTTPError(401, "Unathorized")

    try {
        const decodedToken = jwt.verify(token, "access-secret")
        req.user = decodedToken.userId
        next()
    } catch (error) {
        throw new HTTPError(401, "Unauthorized")
    }
})

module.exports = {
    auth
}