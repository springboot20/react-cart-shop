const express = require("express")
const router = express.Router()
const { signUp, signIn, me, newRefreshToken, newAccessToken, logOut, usersCount, getAllUsers, updateUser, deleteUser } = require("../controller/user.js")
const { auth, isAdmin } = require("../utils/auth.js")

// GET REQUESTS
router.get("/auth/me", auth, me)
router.get("/", isAdmin, getAllUsers)
router.get("/count", isAdmin, usersCount)

// POST REQUESTs
router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/auth/logout", auth, logOut)
router.post("/auth/refresh-token", auth, newRefreshToken)
router.post("/auth/access-token", auth, newAccessToken)

// PATCH REQUESTs
router.patch("/:id", auth, updateUser)

// DELETE REQUESTs
router.delete("/:id", auth, deleteUser)


module.exports = router