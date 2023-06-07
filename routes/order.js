const router = require("express").Router()
const { makeOrder, getOrders, updateOrder, deleteOrder, getOrder } = require('../controller/order')
const { isAdmin } = require("../utils/auth")

router.get("/", getOrders)
router.get("/:id", getOrder)
router.post("/", isAdmin, makeOrder)
router.patch("/:id", isAdmin, updateOrder)
router.delete("/:id", isAdmin, deleteOrder)

module.exports = router