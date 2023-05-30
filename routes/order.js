const router = require("express").Router()
const { makeOrder, getOrders, updateOrder, deleteOrder } = require('../controller/order')

router.get("/", getOrders)
router.post("/", makeOrder)
router.patch("/:id", updateOrder)
router.delete("/:id", deleteOrder)

module.exports = router