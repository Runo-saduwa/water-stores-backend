const express = require('express');
const router = express.Router();
const cartItemController = require('../../controllers/cartItemController');

router.post('/add', cartItemController.addToCart);
router.post('/user/:userId')
router.put('/update/quantity')

module.exports = router;