const router = require("express").Router()
const { addToCart, getAllCart, deleteCartItem, updateCartItem } = require("../controller/cart")
const { isAdmin } = require("../utils/auth")

router.get("/", getAllCart)
router.post("/", isAdmin, addToCart)
router.patch("/:id", isAdmin, updateCartItem)
router.delete("/:id", isAdmin, deleteCartItem)

module.exports = router