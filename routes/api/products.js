const express = require('express');
const router = express.Router();

const productController = require('../../controllers/productController');
const auth = require('../auth');

router.post('/create', auth, productController.createProduct);
router.get('/', auth, productController.getAllProducts)

module.exports = router;
