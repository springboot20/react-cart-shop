const router = require("express").Router()
const { addToCart, getAllCart, deleteCartItem, updateCartItem } = require("../controller/cart")
const { auth } = require("../utils/auth")

router.get("/", getAllCart)
router.post("/:id", auth, addToCart)
router.patch("/:id", auth, updateCartItem)
router.delete("/:id", auth, deleteCartItem)

module.exports = router