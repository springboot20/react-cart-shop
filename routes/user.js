const express = require("express")
const { errorHandler } = require("../error/index.js");
const router = express.Router()
const { signUp, signIn, me, newRefreshToken, newAccessToken, logOut, usersCount } = require("../controller/user.js")
const { auth } = require("../utils/auth.js")
const model = require("../model/index.js");
const multer = require("multer")

const upload = multer({dest: "/uploads"})

router.post("/signup", upload.single("profilePhoto"), signUp)
router.post("/signin", signIn)
router.get("/count", usersCount)
router.post("/auth/logout", auth, logOut)
router.post("/auth/refresh-token", newRefreshToken)
router.post("/auth/access-token", newAccessToken)
router.get("/auth/me", auth, me)

router.get("/", errorHandler(async (req, res, next) => {
    const users = await model.User.find({})

    res.setHeader('Content-Range', "users 0-90/90");
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

    return users

}))


module.exports = router