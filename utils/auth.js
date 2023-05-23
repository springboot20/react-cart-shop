const { errorHandler } = require("../error/index.js");
const model = require("../model/index.js");
const jwt = require("jsonwebtoken");

const auth = errorHandler(async (req, res, next) => {
    const accessToken = req.headers?.authorization.split(" ")[1]

    if (!accessToken) {
        return res.status(401).json({ message: " Unauthorized: access token missing" })
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decodedToken.userId

        const user = await model.User.findById(decodedToken.userId)

        if (!user) {
            return res.status(401).json({ message: " Unauthorized: invalid access token" })
        }

        res.setHeader("Authorization", `Bearer ${accessToken}`)
        next()
    } catch (error) {
        return res.status(401).json({ message: " Unauthorized: access token invalid or expired" })
    }
})

module.exports = { auth };

