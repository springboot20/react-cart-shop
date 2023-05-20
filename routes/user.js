const express = require("express")
const router = express.Router()
const { signUp, signIn, me } = require("../controller/user.js")
const { auth } = require("../utils/auth.js")

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/auth/me", auth, me)

module.exports = router