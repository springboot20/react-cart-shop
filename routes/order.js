const router = require("express").Router()
const { makeOrder, getOrders } = require('../controller/order')

router.get("/", getOrders)
router.post("/", makeOrder)
router.patch("/:id")
router.delete("/:id")

module.exports = router