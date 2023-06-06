const router = require("express").Router()
const { makeOrder, getOrders, updateOrder, deleteOrder, getOrder } = require('../controller/order')

router.get("/", getOrders)
router.get("/:id", getOrder)
router.post("/", makeOrder)
router.patch("/:id", updateOrder)
router.delete("/:id", deleteOrder)

module.exports = router