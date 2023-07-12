/** @format */

const router = require('express').Router();
const { addToCart, getAllCart, deleteCartItem, updateCartItem } = require('../controller/cartController');

router.get('/', getAllCart);
router.post('/', addToCart);
router.patch('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;
