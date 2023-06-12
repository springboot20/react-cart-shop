const router = require("express").Router()
const { makeOrder, getOrders, updateOrder, deleteOrder, getOrder } = require('../controller/order')
const { auth } = require("../utils/auth")

router.get("/", getOrders)
router.get("/:id", getOrder)
router.post("/", auth, makeOrder)
router.patch("/:id", auth, updateOrder)
router.delete("/:id", auth, deleteOrder)

module.exports = router