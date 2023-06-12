const express = require("express")
const router = express.Router()
const { signUp, signIn, me, newRefreshToken, newAccessToken, logOut,setAdmin, usersCount, getAllUsers, updateUser, deleteUser } = require("../controller/user.js")
const { auth, isAdmin } = require("../utils/auth.js")


router.get("/auth/me", auth, me)
router.get("/", isAdmin, getAllUsers)
router.get("/count", isAdmin, usersCount)
router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/auth/logout", auth, logOut)
router.post("/auth/refresh-token", auth, newRefreshToken)
router.post("/auth/access-token", auth, newAccessToken)
router.patch("/:id", auth, updateUser)
router.delete("/:id", auth, deleteUser)

// for Admin
router.put('/:id/admin', isAdmin, setAdmin);



module.exports = router